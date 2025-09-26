import { useMotionValue, useTransform } from 'motion/react';
import type { MotionNodeOptions, TransformTemplate } from 'motion/react';
import * as motion from 'motion/react-client';
import { useRef } from 'react';
import type { ComponentProps } from 'react';

import { cn } from '@/utils';

import { VisualSizeProvider } from './context/visual-size-provider.tsx';
import { getLastScaleFromTransform } from './transform-utils.ts';
import { useContainerResizeMV } from './use-container-resize.ts';

type MotionContainerProps =
  & Omit<MotionNodeOptions, 'transformTemplate'>
  & Pick<ComponentProps<'div'>, 'children' | 'className' | 'onClick'>;

function MotionContainer(props: MotionContainerProps) {
  const { children, className, ...restProps } = props;

  const conatinerRef = useRef<HTMLDivElement | null>(null);
  const { width: layoutW, height: layoutH } = useContainerResizeMV(
    conatinerRef,
  );

  const scaleX = useMotionValue(1);
  const scaleY = useMotionValue(1);

  const visualW = useTransform(() => scaleX.get() * layoutW.get());
  const visualH = useTransform(() => scaleY.get() * layoutH.get());

  const handleParentTransform: TransformTemplate = (
    _latest,
    generated,
  ) => {
    if (generated && generated !== 'none') {
      const scale = getLastScaleFromTransform(generated);
      if (scale) {
        scaleX.set(scale.x);
        scaleY.set(scale.y);
      }
    } else if (generated === 'none') {
      scaleX.set(1);
      scaleY.set(1);
    }
    return generated;
  };

  return (
    // Outer Layout Animation Parent
    <motion.div
      layout
      layoutCrossfade={false}
      ref={conatinerRef}
      transformTemplate={handleParentTransform}
      className={cn('flex justify-center items-center', className)}
      {...restProps}
    >
      <motion.div
        layout
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
