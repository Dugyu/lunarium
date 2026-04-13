// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { useMainThreadRef } from '@lynx-js/react';
import type { MainThreadRef } from '@lynx-js/react';

import type {
  UseSliderPropsBase,
  UseSliderReturnValueBase,
} from '@/types/slider';
import { MathUtils } from '@/utils/math-utils';
import { MTSMathUtils } from '@/utils/mts-math-utils';

import { useOwnable } from './use-mts-ownable';
import type {
  UseOwnableReturnValue,
  Writer,
  WriterRef,
} from './use-mts-ownable';
import { usePointerInteraction } from './use-mts-pointer-interaction';
import type {
  PointerPosition,
  UsePointerInteractionReturnValue,
} from './use-mts-pointer-interaction';

type UseSliderProps = UseSliderPropsBase<{
  writeValue?: WriterRef<number>;
  onDerivedChange?: (value: number) => void;
}>;

type UseSliderReturnValue = UseSliderReturnValueBase<
  UsePointerInteractionReturnValue,
  UseOwnableReturnValue<number> & {
    ratioRef: MainThreadRef<number>;
  }
>;

function useSlider({
  writeValue,
  min = 0,
  max = 100,
  step: stepProp = 1,
  initialValue = min,
  disabled = false,
  onDerivedChange,
  onChange,
}: UseSliderProps): UseSliderReturnValue {
  const step = stepProp > 0 ? stepProp : 1;
  const ratioRef = useMainThreadRef(
    MathUtils.valueToRatio(initialValue, min, max),
  );

  const forwardOnDerivedChange = (v: number) => {
    'main thread';
    ratioRef.current = MTSMathUtils.valueToRatio(v, min, max);
    onDerivedChange?.(v);
  };

  const {
    valueRef,
    writer,
    externalWriter,
    initExternalWriter,
    disposeExternalWriter,
  } = useOwnable({
    writeValue,
    initialValue,
    onDerivedChange: forwardOnDerivedChange,
    onChange,
  });

  const quantize = ({ offsetRatio }: PointerPosition) => {
    'main thread';
    return MTSMathUtils.quantizeFromRatio(offsetRatio, min, max, step);
  };

  const handlePointerUpdate = (pos: PointerPosition) => {
    'main thread';
    if (disabled) return;
    const next = quantize(pos);
    // external-owned: only notify change;
    // owned: update internals and notify change;
    writer(next);
  };

  const pointerReturnedValue = usePointerInteraction({
    onUpdate: handlePointerUpdate,
  });

  return {
    ratioRef,
    valueRef,
    writer,
    externalWriter,
    initExternalWriter,
    disposeExternalWriter,
    min,
    max,
    step,
    disabled,
    ...pointerReturnedValue,
  };
}

export { useSlider };
export type { UseSliderProps, UseSliderReturnValue, WriterRef, Writer };
