import { useCallback } from '@lynx-js/react';

import { LynxUIComponents } from '@/constants';
import type { ComponentMeta, ComponentName, StudioViewMode } from '@/types';
import { cn } from '@/utils';

type ComponentDisplay = ComponentMeta & {
  checked: boolean;
  onClick?: (name: ComponentName) => void;
};

function ComponentItem(
  { name, demoReady, onClick, checked }: ComponentDisplay,
) {
  return (
    <text
      className={cn(
        'px-[8px] py-[2px] ui-checked:py-[12px] text-lg ui-checked:transform-[scale(1.2)] ui-checked:font-semibold transition-all duration-300 ease-in-out',
        demoReady
          ? 'text-base-content hover:opacity-50'
          : 'text-base-content-3 opacity-50',
        checked && 'ui-checked',
      )}
      bindtap={demoReady ? () => onClick?.(name) : undefined}
    >
      {name}
    </text>
  );
}

type ActBloomProps = {
  studioViewMode: StudioViewMode;
  focusedComponent: ComponentName;
};

function ActBloom({ studioViewMode, focusedComponent }: ActBloomProps) {
  const handleComponentClick = useCallback((name: ComponentName) => {
    NativeModules?.bridge?.call(
      'setFocusedComponent',
      { name },
      res => {
        if (import.meta.env.DEV) {
          console.log('setFocusedComponent:', res);
        }
      },
    );
    NativeModules?.ExplorerModule?.openSchema(
      `${process.env
        .ASSET_PREFIX as string}/ActBlueskies.lynx.bundle?fullscreen=true`,
    );
  }, []);

  return (
    <view className='relative size-full'>
      <view className='absolute h-full w-full luna-gradient flex flex-col items-start justify-center px-[48px] gap-[10px]'>
        <view className='flex flex-col items-start justify-center gap-[2px]'>
          <text className='text-base text-primary-content opacity-50'>
            I saw it bloom,
          </text>
          <text className='text-base text-primary-content opacity-50'>
            Like Tokyo in the spring,
          </text>
          <text className='text-base text-primary-content opacity-50'>
            One afternoon,
          </text>
          <text className='text-base text-primary-content opacity-50'>
            My Tokyo, happening,
          </text>
          <text className='text-base text-primary-content opacity-50'>
            The baby blue skies,
          </text>
          <text className='text-base text-primary-content opacity-50'>
            Broke 'em in for the first time,
          </text>
          <text className='text-base text-primary-content opacity-50'>
            As it opened right before my very eyes.
          </text>
        </view>
        <view className='flex flex-col items-start justify-center self-end'>
          <text className='text-base text-primary-content opacity-50 pt-[4px]'>
            Tokyo by{' '}
            <text className='text-base text-primary-content font-semibold'>
              Luna Shadows
            </text>
          </text>
        </view>
      </view>
      <view
        className={cn(
          'absolute bottom-0 h-full w-full bg-base-1 transition-all ease-in-out duration-300 overflow-hidden',
          studioViewMode === 'compare' && 'transform-[translateY(66.7%)]',
          studioViewMode === 'focus' && 'transform-[translateY(0%)]',
          studioViewMode === 'lineup' && 'transform-[translateY(100%)]',
          studioViewMode !== 'lineup' && 'rounded-t-[36px]',
        )}
      />

      <view
        className={cn(
          'size-full px-[72px] pt-[96px] transition-all ease-in-out duration-500',
          studioViewMode !== 'focus' && 'transform-[translateY(100%)]',
        )}
      >
        <view className='w-full flex flex-col items-start justify-start gap-[72px]'>
          {/* Headline */}
          <text className='text-start text-xl text-base-content font-semibold'>
            Performance
          </text>
          {/* Componenets */}
          <view className='w-full flex flex-col items-start justify-start gap-[10px]'>
            {LynxUIComponents.map(d => {
              return (
                <ComponentItem
                  key={d.name}
                  name={d.name}
                  demoReady={d.demoReady}
                  onClick={handleComponentClick}
                  checked={focusedComponent === d.name}
                />
              );
            })}
          </view>
        </view>
      </view>
    </view>
  );
}

export { ActBloom };
