// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { Container } from '@/components/container';
import { LynxStage } from '@/components/lynx-stage';
import { Mockup, MockupContainer } from '@/components/mockup';
import { StudioFrame } from '@/components/studio-frame';

function StudioStatic() {
  return (
    <StudioFrame>
      <Container
        className={'gap-4 pointer-events-none'}
      >
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
    </StudioFrame>
  );
}

export { StudioStatic };
