// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

'main thread';
import { useState } from '@lynx-js/react';
import type { ReactNode } from '@lynx-js/react';

import type { HSL } from '@/types/color';

import { HueSlider, LightnessSlider, SaturationSlider } from './MTCSliderState';

type ColorPickerProps = {
  initialValue: HSL;
  onChange?: (next: HSL) => void;
  children?: ReactNode;
};

function ColorPicker({ initialValue, onChange, children }: ColorPickerProps) {
  const [h, setH] = useState(initialValue[0]);
  const [s, setS] = useState(initialValue[1]);
  const [l, setL] = useState(initialValue[2]);

  return (
    <view className='w-full h-full flex flex-col'>
      <view className='absolute w-full h-12 flex-row justify-center items-center'>
        {children}
      </view>
      <view className='w-full flex flex-col gap-y-4 top-12'>
        <HueSlider
          s={s}
          l={l}
          initialValue={initialValue[0]}
          onChange={(hue: number) => {
            setH(hue);
            onChange?.([hue, s, l]);
          }}
        />
        <SaturationSlider
          h={h}
          l={l}
          initialValue={initialValue[1]}
          onChange={(sat: number) => {
            setS(sat);
            onChange?.([h, sat, l]);
          }}
        />
        <LightnessSlider
          h={h}
          s={s}
          initialValue={initialValue[2]}
          onChange={(light: number) => {
            setL(light);
            onChange?.([h, s, light]);
          }}
        />
      </view>
    </view>
  );
}

export { ColorPicker };
