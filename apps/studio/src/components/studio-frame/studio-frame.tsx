import { Frame } from '@/components/frame';
import { Mockup } from '@/components/mockup';

function StudioFrame() {
  return (
    <Frame>
      <div className='flex-1'>
        <Mockup className='bg-black' />
      </div>
      <div className='flex-1'>
        <Mockup className='bg-white' />
      </div>
    </Frame>
  );
}

export { StudioFrame };
