// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import type { Expand } from '@/types/utils';

type SliderCoreProps = {
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
};

type ResolvedSliderCore = Readonly<{
  min: number;
  max: number;
  step: number;
  disabled: boolean;
}>;

type UseSliderPropsBase<TExtra = object> = Expand<
  SliderCoreProps & {
    initialValue?: number;
    onChange?: (value: number) => void;
  } & TExtra
>;

type SliderReturnValueState = {
  value: number;
  ratio: number;
};

type UseSliderReturnValueBase<
  TPointerReturnValue,
  TSliderReturnValue = SliderReturnValueState,
> = Expand<TPointerReturnValue & TSliderReturnValue & ResolvedSliderCore>;

export type {
  SliderCoreProps,
  ResolvedSliderCore,
  UseSliderPropsBase,
  UseSliderReturnValueBase,
};
