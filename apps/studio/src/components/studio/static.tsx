// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { Stage, StageContainer } from '@dugyu/luna-stage';
import { LynxStage } from '@dugyu/luna-stage/lynx';

import { Container } from '@/components/container';
import { StudioFrame } from '@/components/studio-frame';

function StudioStatic() {
  return (
    <StudioFrame>
      <Container
        className={'gap-4 pointer-events-none'}
      >
        <StageContainer className='flex-1 flex justify-center items-center pointer-events-none'>
          <Stage className='bg-black opacity-10'>
            <LynxStage entry='ActOneDark' />
          </Stage>
        </StageContainer>
        <StageContainer className='flex-1 flex justify-center items-center'>
          <Stage className='bg-white opacity-50'>
            <LynxStage entry='ActOneLight' />
          </Stage>
        </StageContainer>
        <StageContainer className='flex-1 flex justify-center items-center'>
          <Stage className='bg-black opacity-10'>
            <LynxStage entry='ActTwoDark' />
          </Stage>
        </StageContainer>
        <StageContainer className='flex-1 flex justify-center items-center'>
          <Stage className='bg-white opacity-50 '>
            <LynxStage entry='ActTwoLight' />
          </Stage>
        </StageContainer>
      </Container>
    </StudioFrame>
  );
}

export { StudioStatic };
