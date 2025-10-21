import { forwardRef, useRef } from 'react';
import type { ComponentPropsWithoutRef, ForwardedRef } from 'react';

import { Container } from '@/components/container';
import { LynxStage } from '@/components/lynx-stage';
import { MotionContainer, MotionMockup } from '@/components/mockup-motion';
import { useMergedRefs } from '@/hooks/use-merged-refs.ts';
import { cn } from '@/utils';

import { variants } from '../utils.ts';

type FocusViewProps =
  & Omit<
    ComponentPropsWithoutRef<typeof Container>,
    'children'
  >
  & { selected: boolean };

const FocusView = forwardRef<HTMLDivElement, FocusViewProps>(
  FocusViewImpl,
);

function FocusViewImpl(
  props: FocusViewProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const { className, selected, ...restProps } = props;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mergedRef = useMergedRefs(containerRef, ref);

  return (
    <Container
      ref={mergedRef}
      className={cn(
        'gap-4 cursor-pointer pointer-events-auto relative justify-between',
        className,
      )}
      {...restProps}
    >
      {selected
        && (
          <MotionContainer
            layoutId='A'
            key='A'
            className='flex-1 h-full'
            variants={variants}
          >
            <MotionMockup className='bg-black opacity-10'>
              <LynxStage entry='ActOneDark' />
            </MotionMockup>
          </MotionContainer>
        )}
      {selected && (
        <MotionContainer
          layoutId='B'
          key='B'
          className='flex-1 h-full'
          variants={variants}
        >
          <MotionMockup className='bg-white opacity-50'>
            <LynxStage entry='ActOneLight' />
          </MotionMockup>
        </MotionContainer>
      )}
    </Container>
  );
}

export { FocusView };
