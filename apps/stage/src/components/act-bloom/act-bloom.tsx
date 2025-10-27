import { useCallback } from '@lynx-js/react';

import type { StudioViewMode } from '@/types';
import { cn } from '@/utils';

const components = [
  { name: 'Button', demoReady: true },
  { name: 'Checkbox', demoReady: true },
  { name: 'Dialog', demoReady: true },
  { name: 'Input', demoReady: false },
  { name: 'Popover', demoReady: true },
  { name: 'Radio Group', demoReady: true },
  { name: 'Sheet', demoReady: true },
  { name: 'Slider', demoReady: false },
  { name: 'Switch', demoReady: true },
  { name: 'Textarea', demoReady: false },
  { name: 'Tooltip', demoReady: false },
  { name: 'Toast', demoReady: true },
] as const;

type ComponentName = typeof components[number]['name'];
type ComponentMeta = {
  name: ComponentName;
  demoReady: boolean;
};

type ComponentDisplay = ComponentMeta & {
  checked: boolean;
  onClick?: (name: ComponentName) => void;
};

function ComponentName(
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
  }, []);

  return (
    <view className='relative w-full h-full'>
      <view className='absolute h-full w-full luna-gradient' />
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
          'w-full h-full px-[72px] pt-[84px] transition-all ease-in-out duration-500',
          studioViewMode !== 'focus' && 'transform-[translateY(100%)]',
        )}
      >
        <view className='w-full flex flex-col items-start justify-start gap-[48px]'>
          {/* Headline */}
          <text className='text-start text-xl text-base-content font-semibold'>
            Performance
          </text>
          {/* Componenets */}
          <view className='w-full flex flex-col items-start justify-start gap-[10px]'>
            {components.map(d => {
              return (
                <ComponentName
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
export type { ComponentName };
