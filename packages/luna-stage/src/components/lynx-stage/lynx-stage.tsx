// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import type { LynxViewElement as LynxView } from '@lynx-js/web-core/client';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useContainerResize } from '../../hooks/use-container-resize.js';

// ─── JSX augmentation ────────────────────────────────────────────────────────

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface IntrinsicElements {
      'lynx-view': React.DetailedHTMLProps<LynxViewAttributes, HTMLElement>;
    }
  }
}

type LynxViewAttributes = React.HTMLAttributes<HTMLElement> & {
  'lynx-group-id'?: number;
  'transform-vh'?: boolean;
  'transform-vw'?: boolean;
};

// ─── Types ────────────────────────────────────────────────────────────────────

type CSSVarProperties = Record<`--${string}`, string | number>;

export type LynxStageProps = {
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
   * Called once when the Lynx runtime has loaded and the view has rendered.
   */
  onReady?: () => void;
  /**
   * Called when an error occurs during runtime load, template fetch, or rendering.
   */
  onError?: (error: string) => void;
  /**
   * Shared Lynx worker group ID. Defaults to 7.
   * Override to isolate workers between unrelated view groups.
   */
  groupId?: number;
};

// ─── Constants ────────────────────────────────────────────────────────────────

// Container-relative unit hooks for Lynx runtime:
// - `containerType: 'size'` enables `cqw/cqh` units based on the host element box.
// - `--vh-unit/--vw-unit` make `vh/vw` behave like "container viewport" inside `<lynx-view>`.
// - `--rpx-unit` aligns `rpx` scaling with a 750-wide design baseline (mobile-like behavior).
// Note: web-core already applies `contain: content` internally; combined with `containerType: 'size'`
// this effectively behaves like `contain: strict` without us overriding containment explicitly.
const LYNX_VIEW_STYLE: React.CSSProperties & CSSVarProperties = {
  width: '100%',
  height: '100%',
  containerType: 'size',
  '--rpx-unit': 'calc(100cqw / 750)',
  '--vh-unit': '1cqh',
  '--vw-unit': '1cqw',
};

const CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '100%',
};

const DEFAULT_GROUP_ID = 7;

// Pre-compiled regex for webpack public path rewriting in customTemplateLoader.
// Matches .p=\"<anything>\" — handles empty, single-char, and multi-char paths.
const WEBPACK_PUBLIC_PATH_RE = /\.p=\\"[^"]*\\"/g;

// ─── Runtime singleton ────────────────────────────────────────────────────────

// Shared promise so multiple LynxStage instances don't duplicate the dynamic import.
let runtimeReady: Promise<void> | null = null;

function ensureRuntime(): Promise<void> {
  return (runtimeReady ??= import('@lynx-js/web-core/client').then(() => {
    /* side-effect only: registers <lynx-view> custom element */
  }));
}

type LynxViewWithTemplateLoader = LynxView & {
  customTemplateLoader?: (url: string) => Promise<unknown>;
};

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// ─── Component ────────────────────────────────────────────────────────────────

export function LynxStage({
  bundleBaseUrl,
  entry,
  onReady,
  onError,
  groupId = DEFAULT_GROUP_ID,
}: LynxStageProps): React.ReactNode {
  const lynxViewRef = useRef<LynxView>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [ready, setReady] = useState(false);
  const [dimsReady, setDimsReady] = useState(false);

  const renderedRef = useRef(false);
  const lastUrlRef = useRef<string>('');
  const containerSizeRef = useRef({ width: 0, height: 0 });
  const dimsReadyRef = useRef(false);

  const onReadyRef = useRef(onReady);
  const onErrorRef = useRef(onError);
  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);
  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  const reportError = useCallback((msg: string) => {
    onErrorRef.current?.(msg);
  }, []);

  // Reset when entry changes
  useEffect(() => {
    renderedRef.current = false;
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
  }, [reportError]);

  // Watch container dimensions — gate URL assignment on non-zero size.
  // Handles SplitPane collapsed state where size = 0.
  useContainerResize({
    ref: containerRef,
    onResize: ({ width, height }) => {
      const nextWidth = width ?? 0;
      const nextHeight = height ?? 0;
      containerSizeRef.current = { width: nextWidth, height: nextHeight };

      const valid = nextWidth > 0 && nextHeight > 0;
      if (valid !== dimsReadyRef.current) {
        dimsReadyRef.current = valid;
        setDimsReady(valid);
      }
    },
  });

  // Set lynx-view dimensions from container.
  // browserConfig can only be set once — must have valid dimensions.
  const setDimensions = useCallback((): boolean => {
    if (!lynxViewRef.current || !containerRef.current) return false;

    const { width, height } = containerSizeRef.current;
    if (width === 0 || height === 0) return false;

    const pixelRatio = window.devicePixelRatio;
    lynxViewRef.current.browserConfig = {
      pixelWidth: Math.round(width * pixelRatio),
      pixelHeight: Math.round(height * pixelRatio),
      pixelRatio,
    };
    return true;
  }, []);

  // Assign URL once runtime + dimensions are ready.
  // `lastUrlRef` prevents redundant assignments that would trigger a reload.
  // Shadow listener and render detection always re-run on dimsReady toggle,
  // so collapse → expand correctly re-attaches observers.
  useEffect(() => {
    const lynxView = lynxViewRef.current;
    const containerEl = containerRef.current;

    if (!ready || !dimsReady || !lynxView || !containerEl) {
      return;
    }

    const src = `${bundleBaseUrl}${entry}.web.bundle`;
    const urlAlreadySet = lastUrlRef.current === src;

    const initialized = setDimensions();
    if (!initialized) return;

    if (!urlAlreadySet) {
      const tag = `[LynxStage ${entry}]`;

      const view = lynxView as LynxViewWithTemplateLoader;
      view.customTemplateLoader = async (url: string) => {
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`HTTP ${res.status} loading ${url}`);
          const text = await res.text();

          // Rewrite webpack's public path so asset URLs (images etc.) resolve
          // relative to the bundle location, not the page URL.
          const baseUrl = url.substring(0, url.lastIndexOf('/') + 1);
          const rewritten = text.replace(
            WEBPACK_PUBLIC_PATH_RE,
            `.p=\\"${baseUrl}\\"`,
          );
          const parsed: unknown = JSON.parse(rewritten);
          if (!isPlainRecord(parsed)) {
            throw new TypeError('Invalid template JSON');
          }
          const template = parsed;

          // Workaround: when no template modules reference publicPath (no asset
          // imports), rspack omits the local webpack runtime from lepusCode and
          // emits a bare `__webpack_require__` reference. Inject a minimal shim
          // so the entry-point executor (`__webpack_require__.x`) can run.
          const lepusCode = template.lepusCode;
          if (isPlainRecord(lepusCode)) {
            const root = lepusCode.root;
            if (
              typeof root === 'string'
              && root.includes('__webpack_require__')
              && !root.includes('function __webpack_require__')
            ) {
              lepusCode.root =
                `var __webpack_require__={p:"${baseUrl}"};${root}`;
            }
          }
          return template;
        } catch (err) {
          const msg = `Failed to load template: ${
            err instanceof Error ? err.message : String(err)
          }`;
          console.error(tag, msg);
          reportError(msg);
          throw err;
        }
      };

      view.url = src;
      lastUrlRef.current = src;
    }

    // Shadow root is created asynchronously by web-core after url is set.
    // Poll until it becomes available, then watch for first child to mark rendered.
    const el = lynxView as unknown as HTMLElement;
    let disposed = false;
    let mo: MutationObserver | undefined;

    const markRendered = () => {
      if (renderedRef.current) return;
      renderedRef.current = true;
      onReadyRef.current?.();
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
          reportError('Preview timed out: shadow root was not created');
          return;
        }
        const shadow = el.shadowRoot;
        if (shadow) {
          setupShadow(shadow);
        } else {
          requestAnimationFrame(pollShadow);
        }
      };
      pollShadow();

      timer = setTimeout(() => {
        if (!renderedRef.current) {
          reportError(
            'Preview timed out: rendering did not complete within 5s',
          );
        }
      }, 5000);
    }

    return () => {
      disposed = true;
      if (timer) clearTimeout(timer);
      mo?.disconnect();
    };
  }, [ready, dimsReady, entry, bundleBaseUrl, setDimensions, reportError]);

  return (
    <div ref={containerRef} style={CONTAINER_STYLE}>
      <lynx-view
        ref={lynxViewRef}
        style={LYNX_VIEW_STYLE}
        lynx-group-id={groupId}
        transform-vh={true}
        transform-vw={true}
      />
    </div>
  );
}
