import { useState } from '@lynx-js/react';
import { clsx } from 'clsx';

type ActOneProps = {
  defaultOpen?: boolean;
};

function ActOne({ defaultOpen = false }: ActOneProps) {
  const [open, setOpen] = useState(defaultOpen);

  const handleTap = () => {
    setOpen(prev => !prev);
  };

  return (
    <>
      <view className='absolute h-full w-full luna-gradient'>
      </view>
      <view
        className={clsx(
          'absolute bottom-0 h-2/3 w-full bg-base-1 rounded-t-[36px] transition-transform ease-in-out duration-500',
          !open && 'transform-[translateY(50%)]',
        )}
        bindtap={handleTap}
      >
      </view>
    </>
  );
}

export { ActOne };
