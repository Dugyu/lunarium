import { useCallback, useState } from '@lynx-js/react';

import { LynxUIComponentsRegistry } from '@/constants';
import type {
  LynxUIComponentDef,
  LynxUIComponentId,
  StudioViewMode,
} from '@/types';
import { cn } from '@/utils';

type ComponentDisplay = {
  data: LynxUIComponentDef;
  checked: boolean;
  onClick?: (id: LynxUIComponentId) => void;
};

const LynxUIComponents = LynxUIComponentsRegistry.list;

function ComponentItem(
  { data, checked, onClick }: ComponentDisplay,
) {
  return (
    <text
      className={cn(
        'px-[8px] py-[2px] ui-checked:py-[12px] text-lg ui-checked:transform-[scale(1.2)] ui-checked:font-semibold transition-all duration-300 ease-in-out',
        data.demoReady
          ? 'text-base-content hover:opacity-50'
          : 'text-base-content-3 opacity-50',
        checked && 'ui-checked',
      )}
      bindtap={data.demoReady ? () => onClick?.(data.id) : undefined}
    >
      {data.name}
    </text>
  );
}

type ActBloomProps = {
  studioViewMode: StudioViewMode;
  focusedComponent: LynxUIComponentId;
};

function getSavedComponent(): LynxUIComponentId {
  const savedComponent: string | null = NativeModules?.ExplorerModule
    ?.readFromLocalStorage('luna-component');
  if (
    savedComponent
    && LynxUIComponents.some(component => component.id === savedComponent)
  ) {
    return savedComponent as LynxUIComponentId;
  }
  return 'button';
}

function saveComponent(id: LynxUIComponentId) {
  NativeModules?.ExplorerModule?.saveToLocalStorage('luna-component', id);
}

function ActBloom({ studioViewMode, focusedComponent }: ActBloomProps) {
  const [focused, setFocused] = useState<LynxUIComponentId>(getSavedComponent);

  const handleComponentClick = useCallback((id: LynxUIComponentId) => {
    setFocused(id);
    if (__WEB__) {
      NativeModules?.bridge?.call(
        'setFocusedComponent',
        { id },
        res => {
          if (import.meta.env.DEV) {
            console.log('setFocusedComponent:', res);
          }
        },
      );
    }
    saveComponent(id);
    NativeModules?.ExplorerModule?.openSchema(
      `${process.env
        .ASSET_PREFIX as string}/ActBlueSkies.lynx.bundle?fullscreen=true&luna_theme=${
        (id === 'switch' || id === 'radio-group' || id === 'checkbox'
            || id === 'button')
          ? 'luna-light'
          : 'luna-dark'
      }&component_entry=${
        (id === 'switch' || id === 'radio-group' || id === 'checkbox'
            || id === 'button')
          ? id
          : 'checkbox'
      }`,
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
          studioViewMode === 'compare' && 'rounded-t-[36px]',
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
              if (__WEB__) {
                return (
                  <ComponentItem
                    key={d.id}
                    data={d}
                    onClick={handleComponentClick}
                    checked={focusedComponent === d.id}
                  />
                );
              }
              return (
                <ComponentItem
                  key={d.id}
                  data={d}
                  onClick={handleComponentClick}
                  checked={focused === d.id}
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
