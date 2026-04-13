// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import type { Expand, OmitKeys } from './utils';

type StyledSliderPropsBase<
  P extends object = object,
  SK extends string = 'trackStyle' | 'rootStyle',
> = OmitKeys<P, 'min' | 'max' | 'step' | SK>;

type HSLValue<T> = {
  h?: T;
  s?: T;
  l?: T;
};

type HSLSliderPropsBase<
  S,
  V,
  T extends keyof HSLValue<V>,
  K extends keyof HSLValue<V>,
> = Expand<S & Pick<HSLValue<V>, T | K>>;

export type { StyledSliderPropsBase, HSLSliderPropsBase };
