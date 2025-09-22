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
      <Container className='w-full h-full flex flex-row py-10'>
        <MockupContainer className='flex-1 flex justify-center items-center'>
          <Mockup className='bg-black'>
            <LynxStage entry='PortalDark' />
          </Mockup>
        </MockupContainer>
        <MockupContainer className='flex-1 flex justify-center items-center'>
          <Mockup className='bg-white'>
            <LynxStage entry='PortalLight' />
          </Mockup>
        </MockupContainer>
      </Container>
    </Frame>
  );
}

export { StudioFrame };
