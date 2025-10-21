import { AnimatePresence, LayoutGroup } from 'motion/react';
import { useState } from 'react';

import { Container } from '@/components/container';
import { LynxStage } from '@/components/lynx-stage';
import { MotionContainer, MotionMockup } from '@/components/mockup-motion';
import { StudioFrame } from '@/components/studio-frame';
import { cn } from '@/utils';

function FocusView() {
  const [show, setShow] = useState(true);

  return (
    <StudioFrame
      onClick={() => setShow(prev => !prev)}
    >
      <Container
        className={cn(
          'gap-4 cursor-pointer pointer-events-auto relative flex justify-between',
          'flex-row',
        )}
      >
        <LayoutGroup id='luna-studio'>
          <MotionContainer
            layoutId='A'
            className='flex-1 h-full'
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <MotionMockup className='bg-black opacity-10'>
              <LynxStage entry='ActOneDark' />
            </MotionMockup>
          </MotionContainer>
          <MotionContainer
            layoutId='B'
            className='flex-1 h-full'
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <MotionMockup className='bg-white opacity-50'>
              <LynxStage entry='ActOneLight' />
            </MotionMockup>
          </MotionContainer>
          <AnimatePresence mode='popLayout'>
            {show
              && (
                <MotionContainer
                  layoutId='C'
                  key='C'
                  className='flex-1 h-full'
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <MotionMockup className='bg-black opacity-10'>
                    <LynxStage entry='ActTwoDark' />
                  </MotionMockup>
                </MotionContainer>
              )}
          </AnimatePresence>
          <AnimatePresence mode='popLayout'>
            {show && (
              <MotionContainer
                layoutId='D'
                key='D'
                className='flex-1 h-full'
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <MotionMockup className='bg-white opacity-50'>
                  <LynxStage entry='ActTwoLight' />
                </MotionMockup>
              </MotionContainer>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </Container>
    </StudioFrame>
  );
}

export { FocusView };
