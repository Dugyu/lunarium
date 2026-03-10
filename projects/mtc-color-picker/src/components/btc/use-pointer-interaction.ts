// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { useRef } from '@lynx-js/react';
import type { LayoutChangeEvent, TouchEvent } from '@lynx-js/types';

import type {
  PointerPosition,
  UsePointerInteractionProps,
  UsePointerInteractionReturnValueBase,
} from '@/types/pointer';

/**
 * Pointer → element-local coordinates adapter.
 *
 * - The container usually hosts touch/pointer events (recommended for larger hit area).
 * - The element provides the measurement frame (layout + bounding rect).
 * - If you don't need a separate container, you may bind all handlers on the element
 *   itself (container === element).
 *
 * No clamping/step logic is applied here.
 */
function usePointerInteraction({
  onUpdate,
  onCommit,
}: UsePointerInteractionProps = {}): UsePointerInteractionReturnValue {
  /** Element (coordinate frame) & metrics */
  const eleLeftRef = useRef<number | null>(null);
  const eleWidthRef = useRef(0);

  /** Last computed pointer position snapshot */
  const posRef = useRef<PointerPosition | null>(null);

  const draggingRef = useRef(false);

  const buildPosition = (x: number): PointerPosition | null => {
    const width = eleWidthRef.current;
    const left = eleLeftRef.current;

    if (width > 0 && left != null) {
      const offset = x - left;
      const offsetRatio = offset / width;
      const pos = { offset, offsetRatio, elementWidth: width };
      posRef.current = pos;
      return pos;
    }
    return null;
  };

  const handlePointerDown = (e: TouchEvent) => {
    draggingRef.current = true;
    buildPosition(e.detail.x);
    if (posRef.current) {
      onUpdate?.(posRef.current);
    }
  };

  const handlePointerMove = (e: TouchEvent) => {
    if (!draggingRef.current) return;
    buildPosition(e.detail.x);
    if (posRef.current) {
      onUpdate?.(posRef.current);
    }
  };

  const handlePointerUp = (e: TouchEvent) => {
    draggingRef.current = false;
    buildPosition(e.detail.x);
    if (posRef.current) {
      onUpdate?.(posRef.current);
      onCommit?.(posRef.current);
    }
  };

  const handleElementLayoutChange = (e: LayoutChangeEvent) => {
    eleWidthRef.current = e.detail.width;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const currentTarget = lynx
      .createSelectorQuery()
      // @ts-expect-error Lynx internal UniqueID typing
      .selectUniqueID(e.currentTarget.uid);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    currentTarget
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ?.invoke({
        method: 'boundingClientRect',
        params: { relativeTo: 'screen' }, // screen-based so it matches e.detail.x
        success: (res: { left: number }) => {
          eleLeftRef.current = res.left;
        },
      })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .exec();
  };

  return {
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleElementLayoutChange,
  };
}

type UsePointerInteractionReturnValue = UsePointerInteractionReturnValueBase<
  TouchEvent,
  LayoutChangeEvent
>;

export { usePointerInteraction };
export type {
  PointerPosition,
  UsePointerInteractionProps,
  UsePointerInteractionReturnValue,
};
