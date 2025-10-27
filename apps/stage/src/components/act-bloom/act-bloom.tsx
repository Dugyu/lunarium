// import { useState } from '@lynx-js/react';
import type { StudioViewMode } from '@/types';
import { cn } from '@/utils';

type ActBloomProps = {
  studioViewMode: StudioViewMode;
};

function ActBloom({ studioViewMode }: ActBloomProps) {
  return (
    <view className='relative w-full h-full'>
      <view className='absolute h-full w-full luna-gradient' />
      <view
        className={cn(
          'absolute bottom-0 h-full w-full bg-base-1 transition-all ease-in-out duration-500',
          studioViewMode === 'compare' && 'transform-[translateY(66.7%)]',
          studioViewMode === 'focus' && 'transform-[translateY(0%)]',
          studioViewMode === 'lineup' && 'transform-[translateY(100%)]',
          studioViewMode !== 'lineup' && 'rounded-t-[36px]',
        )}
      />
    </view>
  );
}

export { ActBloom };
