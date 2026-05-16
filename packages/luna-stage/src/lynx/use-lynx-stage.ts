// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import type { LynxViewElement as LynxView } from '@lynx-js/web-core/client';
import { useEffect, useRef, useState } from 'react';

import type { UseLynxStageOptions, UseLynxStageResult } from './types';
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

// ─── Debug logger ─────────────────────────────────────────────────────────────

const DEBUG = false;
const t0 = typeof performance !== 'undefined' ? performance.now() : 0;
function dlog(tag: string, ...args: unknown[]): void {
  if (!DEBUG) return;
  const elapsed = (performance.now() - t0).toFixed(0).padStart(6);
  console.log(`[lynx +${elapsed}ms] ${tag}`, ...args);
}

// ─── Runtime singleton ────────────────────────────────────────────────────────

let runtimeReady: Promise<void> | null = null;

function ensureRuntime(): Promise<void> {
  return (runtimeReady ??= (() => {
    dlog('runtime:import:start');
    return import('@lynx-js/web-core/client')
      .then(() => {
        dlog('runtime:import:done');
        // Verify customElements is registered
        const defined = typeof customElements !== 'undefined'
          && customElements.get('lynx-view');
        dlog('runtime:custom-element-defined', !!defined);
      })
      .catch((error) => {
        dlog('runtime:import:error', error);
        runtimeReady = null;
        throw error;
      });
  })());
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

  const renderedRef = useRef(false);

  // Stable refs for callbacks — avoids re-running effects on every render
  const reportReadyEvent = useEventCallback(onReady);
  const reportErrorEvent = useEventCallback(onError);
  const onNativeModulesCallEvent = useEventCallback(onNativeModulesCall);

  const normalizedBundleRoot = normalizeBundleRoot(bundleRoot);
  const src = resolveBundleSrc?.({
    bundleRoot: normalizedBundleRoot,
    entry,
  }) ?? `${normalizedBundleRoot}${entry}.web.bundle`;

  // Reset when the resolved bundle URL changes.
  useEffect(() => {
    dlog(`reset(${entry})`);
    renderedRef.current = false;
  }, [src, entry]);

  // Load web-core eagerly on mount
  useEffect(() => {
    dlog(`runtime-effect(${entry}):start`);
    ensureRuntime()
      .then(() => {
        dlog(`runtime-effect(${entry}):resolved → setReady(true)`);
        setReady(true);
      })
      .catch((err: unknown) => {
        dlog(`runtime-effect(${entry}):rejected`, err);
        reportErrorEvent(
          `Failed to load Lynx runtime: ${
            err instanceof Error ? err.message : String(err)
          }`,
        );
      });
  }, [reportErrorEvent, entry]);

  // Wire up onNativeModulesCall after runtime is ready
  useEffect(() => {
    const view = lynxViewRef.current as LynxViewWithExtensions | null;
    if (!view) {
      dlog(`nativeModules(${entry}): no view yet`);
      return;
    }
    dlog(`nativeModules(${entry}): wiring`);
    view.onNativeModulesCall = (name, data, moduleName) =>
      onNativeModulesCallEvent(name, data, moduleName);
  }, [ready, onNativeModulesCallEvent, entry]);

  // Inject globalProps whenever they change
  useEffect(() => {
    if (!globalProps || !lynxViewRef.current) return;
    dlog(`globalProps(${entry}): updating`);
    lynxViewRef.current.updateGlobalProps(
      globalProps as unknown as UpdateGlobalPropsArg,
    );
  }, [globalProps, entry]);

  useEffect(() => {
    const lynxView = lynxViewRef.current as LynxViewWithExtensions | null;
    if (!ready || !lynxView || renderedRef.current) return;

    const t = setTimeout(() => {
      if (renderedRef.current) return;
      renderedRef.current = true;
      if (globalProps) {
        lynxView.updateGlobalProps(
          globalProps as unknown as UpdateGlobalPropsArg,
        );
      }
      reportReadyEvent();
    }, 0);

    return () => clearTimeout(t);
  }, [
    ready,
    entry,
    bundleRoot,
    globalProps,
    reportReadyEvent,
  ]);

  return {
    lynxViewRef,
    containerRef,
    src,
    ready,
  };
}
