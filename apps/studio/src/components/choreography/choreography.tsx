import { LayoutGroup } from 'motion/react';
import { useState } from 'react';

import { LynxStage } from '@/components/lynx-stage';
import { MotionContainer, MotionMockup } from '@/components/mockup-motion';
import { StudioFrame } from '@/components/studio-frame';
import { cn } from '@/utils';

function Choreography() {
  const [landscape, setLandscape] = useState(true);
  return (
    <StudioFrame
      className={cn('justify-between', landscape ? 'flex-row' : 'flex-col')}
    >
      <LayoutGroup>
        <MotionContainer
          className='flex-1'
          onClick={() => setLandscape(prev => !prev)}
        >
          <MotionMockup className='bg-black opacity-10'>
            <LynxStage entry='ActOneDark' />
          </MotionMockup>
        </MotionContainer>
        <MotionContainer
          className='flex-1'
          onClick={() => setLandscape(prev => !prev)}
        >
          <MotionMockup className='bg-white opacity-50'>
            <LynxStage entry='ActOneLight' />
          </MotionMockup>
        </MotionContainer>
        <MotionContainer
          className='flex-1'
          onClick={() => setLandscape(prev => !prev)}
        >
          <MotionMockup className='bg-black opacity-10'>
            <LynxStage entry='ActTwoDark' />
          </MotionMockup>
        </MotionContainer>
        <MotionContainer
          className='flex-1'
          onClick={() => setLandscape(prev => !prev)}
        >
          <MotionMockup className='bg-white opacity-50'>
            <LynxStage entry='ActTwoLight' />
          </MotionMockup>
        </MotionContainer>
      </LayoutGroup>
    </StudioFrame>
  );
}

export { Choreography };
