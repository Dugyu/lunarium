// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import type { LynxViewElement as LynxView } from '@lynx-js/web-core/client';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { UseLynxStageOptions, UseLynxStageResult } from './types';
import { useContainerResize } from '../hooks/use-container-resize';
import { useEventCallback } from '../hooks/use-event-callback';
import '../types/lynx-view';

export type {
  ResolveBundleSrc,
  UseLynxStageOptions,
  UseLynxStageResult,
} from './types';

type LynxViewWithExtensions = LynxView & {
  onNativeModulesCall?: (
    name: string,
    data: unknown,
    moduleName: string,
  ) => unknown;
};

type UpdateGlobalPropsArg = Parameters<LynxView['updateGlobalProps']>[0];

function normalizeBundleRoot(bundleRoot: string): string {
  return bundleRoot.endsWith('/')
    ? bundleRoot
    : `${bundleRoot}/`;
}

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
  bundleRoot,
  entry,
  globalProps,
  resolveBundleSrc,
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
  const reportReadyEvent = useEventCallback(onReady);
  const reportErrorEvent = useEventCallback(onError);
  const onNativeModulesCallEvent = useEventCallback(onNativeModulesCall);
  const resolveBundleSrcEvent = useEventCallback(resolveBundleSrc);

  // Reset on entry / bundle root change
  useEffect(() => {
    renderedRef.current = false;
    browserConfigInitializedRef.current = false;
    lastUrlRef.current = '';
  }, [entry, bundleRoot]);

  // Load web-core eagerly on mount
  useEffect(() => {
    ensureRuntime()
      .then(() => setReady(true))
      .catch((err: unknown) => {
        reportErrorEvent(
          `Failed to load Lynx runtime: ${
            err instanceof Error ? err.message : String(err)
          }`,
        );
      });
  }, [reportErrorEvent]);

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

  // Wire up onNativeModulesCall after runtime is ready. `useEventCallback`
  // ensures the proxy always calls the latest handler without re-wiring.
  useEffect(() => {
    const view = lynxViewRef.current as LynxViewWithExtensions | null;
    if (!view) return;
    view.onNativeModulesCall = (name, data, moduleName) =>
      onNativeModulesCallEvent(name, data, moduleName);
  }, [ready, onNativeModulesCallEvent]);

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

    const normalizedBundleRoot = normalizeBundleRoot(bundleRoot);
    const src = resolveBundleSrcEvent({
      bundleRoot: normalizedBundleRoot,
      entry,
    }) ?? `${normalizedBundleRoot}${entry}.web.bundle`;
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
      reportReadyEvent();
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
          reportErrorEvent('Preview timed out: shadow root was not created');
          return;
        }
        const shadow = el.shadowRoot;
        if (shadow) setupShadow(shadow);
        else requestAnimationFrame(pollShadow);
      };
      pollShadow();

      timer = setTimeout(() => {
        if (!renderedRef.current) {
          reportErrorEvent(
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
    bundleRoot,
    setDimensions,
    globalProps,
    resolveBundleSrcEvent,
    onNativeModulesCallEvent,
    reportReadyEvent,
    reportErrorEvent,
  ]);

  return { lynxViewRef, containerRef };
}
