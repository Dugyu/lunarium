// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { forwardRef, useMemo, useRef } from 'react';
import type {
  ComponentPropsWithoutRef,
  DetailedHTMLProps,
  ForwardRefExoticComponent,
  ForwardedRef,
  HTMLAttributes,
  RefAttributes,
} from 'react';
import type { JSX } from 'react/jsx-runtime';

import {
  OUTLINE_WEIGHT,
  SMOOTHING_OUTLINE_PATH,
  SMOOTHING_PATH,
} from '../../constants/mockup';
import { useContainerResize } from '../../hooks/use-container-resize';
import { useMergedRefs } from '../../hooks/use-merged-refs';
import type { MockupProps } from '../../types';
import {
  cn,
  computeFrameOffset,
  computeScaleRange,
  lerpFitScale,
  toAlignFactor,
} from '../../utils';
import { createContextWithProvider } from '../context';

const [MockupSizeProvider, useOptionalMockupSize] = createContextWithProvider<
  { width: number; height: number }
>('Mockup', undefined, { throwIfMissing: false });

const DEVICE_CLIP_PATH = `path("${SMOOTHING_PATH}")`;
const DEVICE_OUTLINE_CLIP_PATH = `path("${SMOOTHING_OUTLINE_PATH}")`;

function Mockup({
  className,
  style,
  width: widthProp,
  height: heightProp,
  fit = 'contain',
  alignX = 'center',
  alignY = 'center',
  children,
  baseWidth = 375,
  baseHeight = 812,
  zoom = 1,
  panX = 0,
  panY = 0,
}: MockupProps): JSX.Element {
  const ctx = useOptionalMockupSize();

  const width = widthProp
    ?? ctx?.width ?? baseWidth;

  const height = heightProp
    ?? ctx?.height ?? baseHeight;

  const scaleInfo = useMemo(() => {
    const scaleRange = computeScaleRange({
      containerWidth: width,
      containerHeight: height,
      baseWidth,
      baseHeight,
    });
    const scale = lerpFitScale(scaleRange, fit === 'cover' ? 1 : 0) * zoom;

    const { offsetX, offsetY } = computeFrameOffset({
      ax: toAlignFactor(alignX),
      ay: toAlignFactor(alignY),
      scale,
      baseWidth,
      baseHeight,
    });

    return { scale, offsetX: offsetX + panX, offsetY: offsetY + panY };
  }, [
    width,
    height,
    baseWidth,
    baseHeight,
    fit,
    alignX,
    alignY,
    zoom,
    panX,
    panY,
  ]);

  return (
    // Anchor & coordinate system element, no size
    <div className='relative w-0 h-0 overflow-visible pointer-events-none'>
      {/* Device outline */}
      <div
        className={cn(
          'absolute drop-shadow-lg pointer-events-none',
          className,
        )}
        style={{
          ...style,
          width: baseWidth + 2 * OUTLINE_WEIGHT,
          height: baseHeight + 2 * OUTLINE_WEIGHT,
          transformOrigin: 'top left',
          transform: `translate(${
            scaleInfo.offsetX - OUTLINE_WEIGHT * scaleInfo.scale
          }px, ${
            scaleInfo.offsetY - OUTLINE_WEIGHT * scaleInfo.scale
          }px) scale(${scaleInfo.scale})`,
          clipPath: DEVICE_OUTLINE_CLIP_PATH,
        }}
      />

      {/* Device frame */}
      <div
        className='absolute overflow-hidden drop-shadow-2xl cursor-pointer pointer-events-none'
        style={{
          width: baseWidth,
          height: baseHeight,
          transformOrigin: 'top left',
          transform:
            `translate(${scaleInfo.offsetX}px, ${scaleInfo.offsetY}px) scale(${scaleInfo.scale})`,
          clipPath: DEVICE_CLIP_PATH,
        }}
      >
        {/* Content area inside the device */}
        {children}
      </div>
    </div>
  );
}

type MockupContainerProps = ComponentPropsWithoutRef<'div'> & {
  fallbackWidth?: number;
  fallbackHeight?: number;
};

function MockupContainerImpl(
  props: MockupContainerProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const { fallbackWidth = 0, fallbackHeight = 0, children, ...restProps } =
    props;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const { width = fallbackWidth, height = fallbackHeight } = useContainerResize(
    {
      ref: containerRef,
    },
  );

  const mergedRef = useMergedRefs(containerRef, ref);

  return (
    <MockupSizeProvider
      width={width}
      height={height}
    >
      <div ref={mergedRef} {...restProps}>
        {children}
      </div>
    </MockupSizeProvider>
  );
}

const MockupContainer: ForwardRefExoticComponent<
  & Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'ref'
  >
  & {
    fallbackWidth?: number;
    fallbackHeight?: number;
  }
  & RefAttributes<HTMLDivElement>
> = forwardRef(MockupContainerImpl);

export { Mockup, MockupContainer };
export type { MockupProps };
