// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { forwardRef, useMemo, useRef } from 'react';
import type {
  CSSProperties,
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
} from '../../constants/stage';
import { useContainerResize } from '../../hooks/use-container-resize';
import { useMergedRefs } from '../../hooks/use-merged-refs';
import type { StageProps } from '../../types';
import {
  computeFrameOffset,
  computeScaleRange,
  lerpFitScale,
  toAlignFactor,
} from '../../utils';
import { createContextWithProvider } from '../context';

const [StageSizeProvider, useOptionalStageSize] = createContextWithProvider<
  { width: number; height: number }
>('Stage', undefined, { throwIfMissing: false });

const DEVICE_CLIP_PATH = `path("${SMOOTHING_PATH}")`;
const DEVICE_OUTLINE_CLIP_PATH = `path("${SMOOTHING_OUTLINE_PATH}")`;

const STAGE_ANCHOR_STYLE: CSSProperties = {
  position: 'relative',
  width: 0,
  height: 0,
  overflow: 'visible',
  pointerEvents: 'none',
};

const DEVICE_OUTLINE_LOCKED_STYLE: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  transformOrigin: 'top left',
  pointerEvents: 'none',
  clipPath: DEVICE_OUTLINE_CLIP_PATH,
};

const DEVICE_FRAME_LOCKED_STYLE: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  transformOrigin: 'top left',
  overflow: 'hidden',
  cursor: 'pointer',
  pointerEvents: 'none',
  clipPath: DEVICE_CLIP_PATH,
};

function Stage({
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
}: StageProps): JSX.Element {
  const ctx = useOptionalStageSize();

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
    <div style={STAGE_ANCHOR_STYLE}>
      {/* Device outline */}
      <div
        className={className}
        style={{
          ...style,
          ...DEVICE_OUTLINE_LOCKED_STYLE,
          width: baseWidth + 2 * OUTLINE_WEIGHT,
          height: baseHeight + 2 * OUTLINE_WEIGHT,
          transform: `translate(${
            scaleInfo.offsetX - OUTLINE_WEIGHT * scaleInfo.scale
          }px, ${
            scaleInfo.offsetY - OUTLINE_WEIGHT * scaleInfo.scale
          }px) scale(${scaleInfo.scale})`,
        }}
      />

      {/* Device frame */}
      <div
        style={{
          ...DEVICE_FRAME_LOCKED_STYLE,
          width: baseWidth,
          height: baseHeight,
          transform:
            `translate(${scaleInfo.offsetX}px, ${scaleInfo.offsetY}px) scale(${scaleInfo.scale})`,
        }}
      >
        {/* Content area inside the device */}
        {children}
      </div>
    </div>
  );
}

type StageContainerProps = ComponentPropsWithoutRef<'div'> & {
  fallbackWidth?: number;
  fallbackHeight?: number;
};

function StageContainerImpl(
  props: StageContainerProps,
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
    <StageSizeProvider
      width={width}
      height={height}
    >
      <div ref={mergedRef} {...restProps}>
        {children}
      </div>
    </StageSizeProvider>
  );
}

const StageContainer: ForwardRefExoticComponent<
  & Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'ref'
  >
  & {
    fallbackWidth?: number;
    fallbackHeight?: number;
  }
  & RefAttributes<HTMLDivElement>
> = forwardRef(StageContainerImpl);

export { Stage, StageContainer };
