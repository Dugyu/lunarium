import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

import { Frame } from '@/components/frame';
import { LynxStage } from '@/components/lynx-stage';
import { Mockup, MockupContainer } from '@/components/mockup';

const Container = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  (props, ref) => {
    return <div ref={ref} {...props} />;
  },
);

Container.displayName = 'Container';

function StudioFrame() {
  return (
    <Frame>
      <Container className='w-full h-full flex flex-row py-10 gap-4 flex-wrap px-4 pointer-events-none'>
        <MockupContainer className='flex-1 flex justify-center items-center pointer-events-none'>
          <Mockup className='bg-black opacity-10'>
            <LynxStage entry='ActOneDark' />
          </Mockup>
        </MockupContainer>
        <MockupContainer className='flex-1 flex justify-center items-center'>
          <Mockup className='bg-white opacity-50'>
            <LynxStage entry='ActOneLight' />
          </Mockup>
        </MockupContainer>
        <MockupContainer className='flex-1 flex justify-center items-center'>
          <Mockup className='bg-black opacity-10'>
            <LynxStage entry='ActTwoDark' />
          </Mockup>
        </MockupContainer>
        <MockupContainer className='flex-1 flex justify-center items-center'>
          <Mockup className='bg-white opacity-50 '>
            <LynxStage entry='ActTwoLight' />
          </Mockup>
        </MockupContainer>
      </Container>
    </Frame>
  );
}

export { StudioFrame };
