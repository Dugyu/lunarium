// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import type { LynxViewElement as LynxView } from '@lynx-js/web-core/client';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

import { useContainerResize } from '../../hooks/use-container-resize';
import { useEffectEvent } from '../../hooks/use-effect-event';
import '../../types/lynx-view';

type LynxViewWithExtensions = LynxView & {
  onNativeModulesCall?: (
    name: string,
    data: unknown,
    moduleName: string,
  ) => unknown;
};

type UpdateGlobalPropsArg = Parameters<LynxView['updateGlobalProps']>[0];
type GlobalProps = Record<string, unknown>;

export type UseLynxStageOptions = {
  /**
   * Base URL for bundle assets. Must end with a trailing slash.
   * The resolved bundle URL is: `${bundleBaseUrl}${entry}.web.bundle`
   */
  bundleBaseUrl: string;
  /**
   * Entry name for the Lynx bundle.
   */
  entry: string;
  /**
   * Global props to inject into the Lynx runtime via `updateGlobalProps`.
   * Re-injected whenever the object reference changes.
   */
  globalProps?: GlobalProps;
  /**
   * Called when the Lynx runtime calls a native module.
   * Return a value to send back to the runtime.
   */
  onNativeModulesCall?: (
    name: string,
    data: unknown,
    moduleName: string,
  ) => unknown;
  /**
   * Called once when the view has rendered successfully.
   */
  onReady?: () => void;
  /**
   * Called when an error occurs during runtime load, template fetch, or rendering.
   */
  onError?: (error: string) => void;
};

export type UseLynxStageResult = {
  /** Attach to the `<lynx-view>` element. */
  lynxViewRef: RefObject<LynxView>;
  /** Attach to the container `<div>` wrapping `<lynx-view>`. */
  containerRef: RefObject<HTMLDivElement>;
};

// ─── Runtime singleton ────────────────────────────────────────────────────────

let runtimeReady: Promise<void> | null = null;

function ensureRuntime(): Promise<void> {
  return (runtimeReady ??= import('@lynx-js/web-core/client')
    .then(() => {
      /* side-effect only: registers <lynx-view> custom element */
    })
    .catch((error) => {
      runtimeReady = null;
      throw error;
    }));
}

export function useLynxStage({
  bundleBaseUrl,
  entry,
  globalProps,
  onNativeModulesCall,
  onReady,
  onError,
}: UseLynxStageOptions): UseLynxStageResult {
  const lynxViewRef = useRef<LynxView>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [ready, setReady] = useState(false);
  const [dimsReady, setDimsReady] = useState(false);

  const renderedRef = useRef(false);
  const browserConfigInitializedRef = useRef(false);
  const lastUrlRef = useRef<string>('');
  const containerSizeRef = useRef({ width: 0, height: 0 });
  const dimsReadyRef = useRef(false);

  // Stable refs for callbacks — avoids re-running effects on every render
  const onReadyEvent = useEffectEvent(onReady);
  const reportError = useEffectEvent<[string]>(onError);
  const onNativeModulesCallEvent = useEffectEvent(onNativeModulesCall);

  // Reset on entry / base URL change
  useEffect(() => {
    renderedRef.current = false;
    browserConfigInitializedRef.current = false;
    lastUrlRef.current = '';
  }, [entry, bundleBaseUrl]);

  // Load web-core eagerly on mount
  useEffect(() => {
    ensureRuntime()
      .then(() => setReady(true))
      .catch((err: unknown) => {
        reportError(
          `Failed to load Lynx runtime: ${
            err instanceof Error ? err.message : String(err)
          }`,
        );
      });
  }, []);

  // Watch container dimensions — gate URL assignment on non-zero size
  useContainerResize({
    ref: containerRef,
    onResize: ({ width, height }) => {
      const w = width ?? 0;
      const h = height ?? 0;
      containerSizeRef.current = { width: w, height: h };
      const valid = w > 0 && h > 0;
      if (valid !== dimsReadyRef.current) {
        dimsReadyRef.current = valid;
        setDimsReady(valid);
      }
    },
  });

  // Set browserConfig from container size.
  // Can only be set once — must have valid dimensions.
  const setDimensions = useCallback((): boolean => {
    if (!lynxViewRef.current) return false;
    if (browserConfigInitializedRef.current) return true;
    const { width, height } = containerSizeRef.current;
    if (width === 0 || height === 0) return false;
    const pixelRatio = window.devicePixelRatio;
    lynxViewRef.current.browserConfig = {
      pixelWidth: Math.round(width * pixelRatio),
      pixelHeight: Math.round(height * pixelRatio),
      pixelRatio,
    };
    browserConfigInitializedRef.current = true;
    return true;
  }, []);

  // Wire up onNativeModulesCall whenever the handler changes
  useEffect(() => {
    const view = lynxViewRef.current as LynxViewWithExtensions | null;
    if (!view) return;
    view.onNativeModulesCall = (name, data, moduleName) =>
      onNativeModulesCallEvent(name, data, moduleName);
  }, [ready]); // re-wire after runtime is ready and ref is populated

  // Inject globalProps whenever they change
  useEffect(() => {
    if (!globalProps || !lynxViewRef.current || !renderedRef.current) return;
    lynxViewRef.current.updateGlobalProps(
      globalProps as unknown as UpdateGlobalPropsArg,
    );
  }, [globalProps]);

  // Assign URL once runtime + dimensions are ready
  useEffect(() => {
    const lynxView = lynxViewRef.current as LynxViewWithExtensions | null;
    if (!ready || !dimsReady || !lynxView) return;

    const normalizedBundleBaseUrl = bundleBaseUrl.endsWith('/')
      ? bundleBaseUrl
      : `${bundleBaseUrl}/`;
    const src = `${normalizedBundleBaseUrl}${entry}.web.bundle`;
    const urlAlreadySet = lastUrlRef.current === src;

    const initialized = setDimensions();
    if (!initialized) return;

    if (!urlAlreadySet) {
      lynxView.url = src;
      lastUrlRef.current = src;
    }

    // Poll for shadow root, then watch for first child to mark rendered
    const el = lynxView as unknown as HTMLElement;
    let disposed = false;
    let mo: MutationObserver | undefined;

    const markRendered = () => {
      if (renderedRef.current) return;
      renderedRef.current = true;
      // Flush globalProps that arrived before render was complete
      if (globalProps) {
        lynxView.updateGlobalProps(
          globalProps as unknown as UpdateGlobalPropsArg,
        );
      }
      onReadyEvent();
    };

    const setupShadow = (shadow: ShadowRoot) => {
      if (shadow.childElementCount > 0) {
        markRendered();
      } else {
        mo = new MutationObserver(() => {
          if (shadow.childElementCount > 0) {
            markRendered();
            mo!.disconnect();
          }
        });
        mo.observe(shadow, { childList: true, subtree: true });
      }
    };

    let timer: ReturnType<typeof setTimeout> | undefined;

    if (!renderedRef.current) {
      const pollStart = performance.now();
      const pollShadow = () => {
        if (disposed) return;
        if (performance.now() - pollStart > 3000) {
          if (timer) clearTimeout(timer);
          reportError('Preview timed out: shadow root was not created');
          return;
        }
        const shadow = el.shadowRoot;
        if (shadow) setupShadow(shadow);
        else requestAnimationFrame(pollShadow);
      };
      pollShadow();

      timer = setTimeout(() => {
        if (!renderedRef.current) {
          reportError(
            'Preview timed out: rendering did not complete within 5s',
          );
        }
      }, 5000);
    } else {
      // Already rendered — re-attach shadow listener for click fix if needed
      const shadow = el.shadowRoot;
      if (shadow) setupShadow(shadow);
    }

    return () => {
      disposed = true;
      if (timer) clearTimeout(timer);
      mo?.disconnect();
    };
  }, [
    ready,
    dimsReady,
    entry,
    bundleBaseUrl,
    setDimensions,
    globalProps,
  ]);

  return { lynxViewRef, containerRef };
}
