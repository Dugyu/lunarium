import { useEffect, useRef, useState } from 'react';
import type { MutableRefObject } from 'react';

import { useEffectEvent } from './use-effect-event.ts';

type Size = {
  width?: number;
  height?: number;
};

/** Constructor type for ResizeObserver */
type ResizeObserverCtor = new(
  callback: ResizeObserverCallback,
) => ResizeObserver;

type useContainerResizeOptions<T> = {
  /** The ref of the element to observe. */
  ref: MutableRefObject<T | null>;
  /**
   * Optional: inject a polyfill constructor (e.g. `resize-observer-polyfill`)
   */
  ResizeObserverImpl?: ResizeObserverCtor;
  /**
   * Optional: callback mode — if provided, the hook will not re-render,
   * it will just call `onResize` when size changes.
   */
  onResize?: (size: Size) => void;
};
/**
 * A lightweight version of the `useResizeObserver` hook from [`usehooks-ts`](https://usehooks-ts.com/react-hook/use-resize-observer).
 *
 * Differences from the original:
 * - Only supports the default `'content-box'` model
 * - Optional polyfill injection (`ResizeObserverImpl`)
 */
function useContainerResize<T extends HTMLElement = HTMLElement>({
  ref,
  ResizeObserverImpl,
  onResize: onResizeProp,
}: useContainerResizeOptions<T>): Size {
  const [size, setSize] = useState<Size>(() => ({
    width: undefined,
    height: undefined,
  }));
  const prev = useRef<Size>({ width: undefined, height: undefined });
  const onResize = useEffectEvent(onResizeProp);
  const hasOnResize = onResizeProp !== undefined;

  useEffect(() => {
    if (!ref.current) return;
    // SSR & Polyfill
    // Prefer injected ctor; otherwise read from the environment in a typed way.
    const RO: ResizeObserverCtor | undefined = ResizeObserverImpl
      ?? ((typeof window !== 'undefined' && 'ResizeObserver' in window)
        ? window.ResizeObserver
        : undefined);

    if (!RO) return;

    const observer: ResizeObserver = new RO(
      (entries) => {
        const entry = entries[0];
        let width = 0;
        let height = 0;

        const cbsUnknown = entry.contentBoxSize as unknown;

        if (Array.isArray(cbsUnknown)) {
          // The standard makes contentBoxSize an array...
          const first = entry.contentBoxSize[0];
          if (first) {
            width = entry.contentBoxSize[0].inlineSize;
            height = entry.contentBoxSize[0].blockSize;
          }
        } else if (isContentBoxSizeSingleItem(cbsUnknown)) {
          // ... but old versions of Firefox treat it as a single item
          width = cbsUnknown.inlineSize;
          height = cbsUnknown.blockSize;
        } else {
          // fallback to legacy API
          width = entry.contentRect.width;
          height = entry.contentRect.height;
        }

        const changed = width !== prev.current.width
          || height !== prev.current.height;

        if (!changed) return;

        const next: Size = { width, height };
        prev.current = next;
        if (hasOnResize) {
          onResize(next);
        } else if (ref.current) {
          setSize(next);
        }
      },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, ResizeObserverImpl, onResize, hasOnResize]);

  return size;
}

export { useContainerResize };

function isContentBoxSizeSingleItem(
  v: unknown,
): v is { inlineSize: number; blockSize: number } {
  return (
    typeof v === 'object'
    && v !== null
    && typeof (v as { inlineSize?: unknown }).inlineSize === 'number'
    && typeof (v as { blockSize?: unknown }).blockSize === 'number'
  );
}
