import { useMotionValue, useTransform } from 'motion/react';
import type { Box, MotionNodeOptions, TransformTemplate } from 'motion/react';
import * as motion from 'motion/react-client';
import { forwardRef, useRef } from 'react';
import type { ComponentPropsWithoutRef, ForwardedRef } from 'react';

import { useMergedRefs } from '@/hooks/use-merged-refs.ts';
import { cn } from '@/utils';

import { VisualSizeProvider } from './context/visual-size-provider.tsx';
import { getLastScaleFromTransform } from './transform-utils.ts';
import { useContainerResizeMV } from './use-container-resize.ts';

type MotionContainerProps =
  & Omit<MotionNodeOptions, 'transformTemplate'>
  & ComponentPropsWithoutRef<'div'>
  & { layoutId: string };

const MotionContainer = forwardRef<HTMLDivElement, MotionContainerProps>(
  MotionContainerImpl,
);

function MotionContainerImpl(
  props: MotionContainerProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const { children, className, layoutId, ...restProps } = props;

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Layout size from ResizeObserver (untransformed border-box)
  const { width: layoutW, height: layoutH } = useContainerResizeMV(
    containerRef,
  );

  const mergedRef = useMergedRefs(containerRef, ref);

  // Frozen base size during layout animation (snapshot at measure/start)
  const animLayoutW = useMotionValue(0);
  const animLayoutH = useMotionValue(0);

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
      className={cn('flex justify-center items-center', className)}
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

export { MotionContainer };
