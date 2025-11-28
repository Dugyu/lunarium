import { useState } from '@lynx-js/react';
import { clsx } from 'clsx';

function ActOne() {
  const [snapIndex, setSnapIndex] = useState(1);

  const handleTap = () => {
    setSnapIndex(prev => (prev + 1) % 3);
  };

  return (
    <>
      <view className='absolute h-full w-full luna-gradient'>
      </view>
      <view
        className={clsx(
          'absolute -bottom-1/3 h-full w-full bg-canvas rounded-t-[36px] transition-all ease-in-out duration-500',
          snapIndex === 0 && 'transform-[translateY(37%)]',
          snapIndex === 2 && 'transform-[translateY(-20%)]',
        )}
        bindtap={handleTap}
      >
      </view>
    </>
  );
}

export { ActOne };
