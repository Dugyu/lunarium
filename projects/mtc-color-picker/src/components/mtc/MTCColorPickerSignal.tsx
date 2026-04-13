// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

'main thread';
import { useSignal, useSignalEffect } from '@lynx-js/react/signals';

import type { HSL } from '@/types/color';

import {
  HueSlider,
  LightnessSlider,
  SaturationSlider,
} from './MTCSliderSignal';

type ColorPickerProps = {
  initialValue: HSL;
  onChange?: (next: HSL) => void;
};

function ColorPicker({ initialValue, onChange }: ColorPickerProps) {
  const h = useSignal(initialValue[0]);
  const s = useSignal(initialValue[1]);
  const l = useSignal(initialValue[2]);

  useSignalEffect(() => {
    onChange?.([h.value, s.value, l.value]);
  });

  return (
    <view className='w-full h-full flex flex-col gap-y-4'>
      <HueSlider
        s={s}
        l={l}
        initialValue={initialValue[0]}
        onChange={(hue: number) => {
          // eslint-disable-next-line react-hooks/immutability -- Signal update
          h.value = hue;
        }}
      />
      <SaturationSlider
        h={h}
        l={l}
        initialValue={initialValue[1]}
        onChange={(sat: number) => {
          // eslint-disable-next-line react-hooks/immutability -- Signal update
          s.value = sat;
        }}
      />
      <LightnessSlider
        h={h}
        s={s}
        initialValue={initialValue[2]}
        onChange={(light: number) => {
          // eslint-disable-next-line react-hooks/immutability -- Signal update
          l.value = light;
        }}
      />
    </view>
  );
}

export { ColorPicker };
