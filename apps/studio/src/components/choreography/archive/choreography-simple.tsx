import { LayoutGroup } from 'motion/react';
import { useState } from 'react';

import { Container } from '@/components/container';
import { LynxStage } from '@/components/lynx-stage';
import { MotionContainer, MotionMockup } from '@/components/mockup-motion';
import { StudioFrame } from '@/components/studio-frame';
import { cn } from '@/utils';

function Choreography() {
  const [landscape, setLandscape] = useState(true);
  return (
    <StudioFrame>
      <Container
        className={cn(
          'gap-4 pointer-events-none justify-between',
          landscape ? 'flex-row' : 'flex-col',
        )}
      >
        <LayoutGroup id='studio'>
          <MotionContainer
            layoutId='A'
            className='flex-1'
            onClick={() => setLandscape(prev => !prev)}
          >
            <MotionMockup className='bg-black opacity-10'>
              <LynxStage entry='ActOneDark' />
            </MotionMockup>
          </MotionContainer>
          <MotionContainer
            layoutId='B'
            className='flex-1'
            onClick={() => setLandscape(prev => !prev)}
          >
            <MotionMockup className='bg-white opacity-50'>
              <LynxStage entry='ActOneLight' />
            </MotionMockup>
          </MotionContainer>
          <MotionContainer
            layoutId='C'
            className='flex-1'
            onClick={() => setLandscape(prev => !prev)}
          >
            <MotionMockup className='bg-black opacity-10'>
              <LynxStage entry='ActTwoDark' />
            </MotionMockup>
          </MotionContainer>
          <MotionContainer
            layoutId='D'
            className='flex-1'
            onClick={() => setLandscape(prev => !prev)}
          >
            <MotionMockup className='bg-white opacity-50'>
              <LynxStage entry='ActTwoLight' />
            </MotionMockup>
          </MotionContainer>
        </LayoutGroup>
      </Container>
    </StudioFrame>
  );
}

export { Choreography };
