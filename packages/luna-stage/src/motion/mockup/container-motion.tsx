// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { useMotionValue, useTransform } from 'motion/react';
import type {
  Box,
  MotionNodeOptions,
  MotionStyle,
  TransformTemplate,
} from 'motion/react';
import * as motion from 'motion/react-client';
import { forwardRef, useRef } from 'react';
import type {
  ComponentPropsWithoutRef,
  DetailedHTMLProps,
  ForwardRefExoticComponent,
  ForwardedRef,
  HTMLAttributes,
  RefAttributes,
} from 'react';

import { getLastScaleFromTransform } from './transform-utils';
import { useContainerResizeMV } from './use-container-resize-mv';
import { useMergedRefs } from '../../hooks/use-merged-refs';
import { cn } from '../../utils';
import { VisualSizeProvider } from '../context/visual-size-provider';

type MotionMockupContainerProps =
  & Omit<MotionNodeOptions, 'transformTemplate'>
  & ComponentPropsWithoutRef<'div'>
  & { layoutId: string };

const MotionMockupContainer: ForwardRefExoticComponent<
  & Omit<MotionNodeOptions, 'transformTemplate'>
  & Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'ref'
  >
  & {
    layoutId: string;
  }
  & RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, MotionMockupContainerProps>(
  MotionMockupContainerImpl,
);

function MotionMockupContainerImpl(
  props: MotionMockupContainerProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const { children, className, layoutId, style, ...restProps } = props;

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Layout size from ResizeObserver (untransformed border-box)
  const { width: layoutW, height: layoutH } = useContainerResizeMV(
    containerRef,
  );

  const mergedRef = useMergedRefs(containerRef, ref);

  // Frozen base size during layout animation (snapshot at measure/start)
  const animLayoutW = useMotionValue(layoutW.get());
  const animLayoutH = useMotionValue(layoutH.get());

  // Animation phase flag: 0 (idle) / 1 (animating)
  const isAnimating = useMotionValue(0);

  // Parent scale extracted from transformTemplate
  const scaleX = useMotionValue(1);
  const scaleY = useMotionValue(1);

  // Visual size in the local transform coord system: base × scale
  const visualW = useTransform(() =>
    (isAnimating.get() ? animLayoutW.get() : layoutW.get()) * scaleX.get()
  );
  const visualH = useTransform(() =>
    (isAnimating.get() ? animLayoutH.get() : layoutH.get()) * scaleY.get()
  );

  const handleParentTransform: TransformTemplate = (
    _latest,
    generated,
  ) => {
    if (generated && generated !== 'none') {
      const s = getLastScaleFromTransform(generated);
      if (s) {
        scaleX.set(s.x);
        scaleY.set(s.y);
      }
    } else if (generated === 'none') {
      scaleX.set(1);
      scaleY.set(1);
    }
    return generated;
  };

  const handleLayoutMeasure = (box: Box) => {
    animLayoutW.set(box.x.max - box.x.min);
    animLayoutH.set(box.y.max - box.y.min);
  };

  const handleLayoutAnimationStart = () => {
    isAnimating.set(1);
  };

  const handleLayoutAnimationComplete = () => {
    isAnimating.set(0);
    animLayoutW.set(layoutW.get());
    animLayoutH.set(layoutH.get());
  };

  return (
    // Outer Layout Animation Parent
    <motion.div
      layout
      layoutId={`_${layoutId}_parent`}
      layoutCrossfade={false}
      ref={mergedRef}
      onLayoutMeasure={handleLayoutMeasure}
      onLayoutAnimationStart={handleLayoutAnimationStart}
      onLayoutAnimationComplete={handleLayoutAnimationComplete}
      transformTemplate={handleParentTransform}
      className={cn(
        'flex justify-center items-center overflow-hidden',
        className,
      )}
      {...(style !== undefined && { style: style as MotionStyle })}
      {...restProps}
    >
      <motion.div
        layout
        layoutId={`_${layoutId}_child`}
        layoutCrossfade={false}
        className='relative w-[4px] h-[4px] flex justify-center items-center overflow-visible'
      >
        <VisualSizeProvider visualH={visualH} visualW={visualW}>
          {children}
        </VisualSizeProvider>
      </motion.div>
    </motion.div>
  );
}

export { MotionMockupContainer };
