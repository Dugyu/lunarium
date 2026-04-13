// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { runOnBackground, useMemo, useState } from '@lynx-js/react';

import type { Color } from '@/types/color';
import { HSLGradients } from '@/utils/hsl-gradients';

import { HueSlider, LightnessSlider, SaturationSlider } from './BTCMTSSlider';

type ColorPickerProps = {
  initialValue?: Color;
  'main-thread:onChange'?: (next: Color) => void;
};

function ColorPicker({
  initialValue: hsl = [199, 99, 72],
  ['main-thread:onChange']: onChange,
}: ColorPickerProps) {
  const [hue, setHue] = useState(hsl[0]);
  const [saturation, setSaturation] = useState(hsl[1]);
  const [lightness, setLightness] = useState(hsl[2]);

  const { edge: hueEdge, track: hueTrack } = useMemo(
    () => HSLGradients.hueGradientPair(saturation, lightness),
    [saturation, lightness],
  );

  const { edge: satEdge, track: satTrack } = useMemo(
    () => HSLGradients.saturationGradientPair(hue, lightness),
    [hue, lightness],
  );

  const { edge: lightEdge, track: lightTrack } = useMemo(
    () => HSLGradients.lightnessGradientPair(hue, saturation),
    [hue, saturation],
  );

  const handleHueChange = (v: number) => {
    'main thread';
    void runOnBackground(setHue)(v);
    onChange?.([v, saturation, lightness]);
  };

  const handleSaturationChange = (v: number) => {
    'main thread';
    void runOnBackground(setSaturation)(v);
    onChange?.([hue, v, lightness]);
  };

  const handleLightnessChange = (v: number) => {
    'main thread';
    void runOnBackground(setLightness)(v);
    onChange?.([hue, saturation, v]);
  };

  return (
    <view className='w-full h-full flex flex-col gap-y-4'>
      <HueSlider
        initialValue={hue}
        main-thread:onChange={handleHueChange}
        rootStyle={{ backgroundImage: hueEdge }}
        trackStyle={{ backgroundImage: hueTrack }}
      />
      <SaturationSlider
        initialValue={saturation}
        main-thread:onChange={handleSaturationChange}
        rootStyle={{ backgroundImage: satEdge }}
        trackStyle={{ backgroundImage: satTrack }}
      />
      <LightnessSlider
        initialValue={lightness}
        main-thread:onChange={handleLightnessChange}
        rootStyle={{ backgroundImage: lightEdge }}
        trackStyle={{ backgroundImage: lightTrack }}
      />
    </view>
  );
}

export { ColorPicker };
