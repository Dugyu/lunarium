import { useMotionValue } from 'motion/react';
import type { MotionValue } from 'motion/react';
import { useRef } from 'react';

import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect.ts';

type SizeMV = { width: MotionValue<number>; height: MotionValue<number> };

type ResizeObserverCtor = new(cb: ResizeObserverCallback) => ResizeObserver;

export function useContainerResizeMV<T extends HTMLElement = HTMLElement>(
  ref: React.MutableRefObject<T | null>,
  opts?: {
    ResizeObserverImpl?: ResizeObserverCtor;
    onResize?: (w: number, h: number) => void;
  },
): SizeMV {
  const width = useMotionValue(0);
  const height = useMotionValue(0);
  const prevW = useRef<number>(-1);
  const prevH = useRef<number>(-1);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const RO: ResizeObserverCtor | undefined = opts?.ResizeObserverImpl
      ?? ((typeof window !== 'undefined' && 'ResizeObserver' in window)
        ? window.ResizeObserver
        : undefined);
    if (!RO) return;

    const obs = new RO(entries => {
      const entry = entries[0];
      let w = 0;
      let h = 0;

      const cbs = entry.contentBoxSize as unknown;

      if (Array.isArray(cbs)) {
        // The standard makes contentBoxSize an array...
        const first = entry.contentBoxSize[0];
        if (first) {
          w = entry.contentBoxSize[0].inlineSize;
          h = entry.contentBoxSize[0].blockSize;
        }
      } else if (isContentBoxSizeSingleItem(cbs)) {
        // ... but old versions of Firefox treat it as a single item
        w = cbs.inlineSize;
        h = cbs.blockSize;
      } else {
        // fallback to legacy API
        w = entry.contentRect.width;
        h = entry.contentRect.height;
      }
      if (w !== prevW.current || h !== prevH.current) {
        prevW.current = w;
        prevH.current = h;
        width.set(w);
        height.set(h);
        opts?.onResize?.(w, h);
      }
    });

    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, opts, opts?.ResizeObserverImpl, opts?.onResize, width, height]);

  return { width, height };
}

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
