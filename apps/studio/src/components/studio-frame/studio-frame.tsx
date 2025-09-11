import { Frame } from '@/components/frame';
import { Mockup } from '@/components/mockup';

function StudioFrame() {
  return (
    <Frame>
      <div className='flex-1 flex justify-center items-center'>
        <Mockup className='bg-black' />
      </div>
      <div className='flex-1 flex justify-center items-center'>
        <Mockup className='bg-white' />
      </div>
    </Frame>
  );
}

export { StudioFrame };
