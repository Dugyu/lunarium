import { Container } from '@/components/container';
import { LynxStage } from '@/components/lynx-stage';
import { Mockup, MockupContainer } from '@/components/mockup';
import { StudioFrame } from '@/components/studio-frame';

function StudioStaic() {
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

export { StudioStaic };
