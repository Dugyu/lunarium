// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { useMainThreadRef } from '@lynx-js/react';
import type { CSSProperties, MainThread } from '@lynx-js/types';

import type { Expand, RenameKeys } from '@/types/utils';

import { useSlider } from './use-mts-slider';
import type { UseSliderProps } from './use-mts-slider';

type SliderProps = Expand<
  RenameKeys<
    Omit<UseSliderProps, 'onDerivedChange'>,
    {
      onChange?: 'main-thread:onChange';
      writeValue?: 'main-thread:writeValue';
    }
  > & {
    // Init callback: for attaching additional writers
    'main-thread:onInit'?: (ref: MainThread.Element) => void;
    // Styling
    rootStyle?: CSSProperties;
    trackStyle?: CSSProperties;
  }
>;

/** ================= Base Slider ================= */

function Slider({
  ['main-thread:writeValue']: externalWriterRef,
  ['main-thread:onInit']: onInit,
  ['main-thread:onChange']: onChange,
  rootStyle,
  trackStyle,
  ...restProps
}: SliderProps) {
  const thumbRef = useMainThreadRef<MainThread.Element | null>(null);

  const updateListenerRef = useMainThreadRef<(value: number) => void>();

  const handleDerivedChange = (value: number) => {
    'main thread';
    if (updateListenerRef.current) {
      updateListenerRef.current(value);
    }
  };

  const {
    ratioRef,
    initExternalWriter,
    disposeExternalWriter,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleElementLayoutChange,
  } = useSlider({
    writeValue: externalWriterRef,
    onDerivedChange: handleDerivedChange,
    onChange: onChange,
    ...restProps,
  });

  const updateThumbStyle = () => {
    'main thread';
    if (thumbRef.current) {
      thumbRef.current.setStyleProperties({
        left: `${ratioRef.current * 100}%`,
      });
    }
  };

  const initRoot = (ref: MainThread.Element) => {
    'main thread';
    // Bind writeValue to prop
    if (ref) {
      initExternalWriter();
    } else {
      disposeExternalWriter();
    }
    // Initialization callback
    onInit?.(ref);
  };

  const initThumb = (ref: MainThread.Element) => {
    'main thread';
    thumbRef.current = ref;
    if (ref) {
      updateListenerRef.current = updateThumbStyle;
    } else {
      updateListenerRef.current = undefined;
    }
    updateThumbStyle();
  };

  return (
    // Root
    <view
      main-thread:ref={initRoot}
      main-thread:bindtouchstart={handlePointerDown}
      main-thread:bindtouchmove={handlePointerMove}
      main-thread:bindtouchend={handlePointerUp}
      main-thread:bindtouchcancel={handlePointerUp}
      className='relative px-5 bg-primary w-full h-10 flex flex-row items-center rounded-full'
      style={rootStyle}
    >
      {/* Track Positioner */}
      <view
        main-thread:bindlayoutchange={handleElementLayoutChange}
        className='relative w-full h-full flex flex-row items-center'
      >
        {/* Track Visualizer */}
        <view className='w-full h-full bg-secondary' style={trackStyle}></view>
        <view
          main-thread:ref={initThumb}
          className='absolute bg-white size-8 rounded-full -translate-x-1/2 shadow-md'
        >
        </view>
      </view>
    </view>
  );
}

/** ================= HSL Sliders Shared ================= */

type HSLSliderProps = Expand<
  Omit<SliderProps, 'min' | 'max' | 'step' | 'main-thread:onInit'>
>;

/** ================= Hue Slider ================= */

function HueSlider(props: HSLSliderProps) {
  return <Slider min={0} max={360} step={1} {...props} />;
}

/** ================= Saturation Slider ================= */

function SaturationSlider(props: HSLSliderProps) {
  return <Slider min={0} max={100} step={1} {...props} />;
}

/** ================= Lightness Slider ================= */

function LightnessSlider(props: HSLSliderProps) {
  return <Slider min={0} max={100} step={1} {...props} />;
}

export { HueSlider, SaturationSlider, LightnessSlider };
