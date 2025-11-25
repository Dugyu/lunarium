import { useCallback, useState } from '@lynx-js/react';

import {
  LUNA_DEFAULT_COMPONENT,
  LUNA_SAVED_COMPONENT,
  LynxUIComponentsRegistry,
} from '@/constants';
import { explorerRead, explorerSave } from '@/native';
import type {
  LynxUIComponentDef,
  LynxUIComponentId,
  StudioViewMode,
} from '@/types';
import { cn } from '@/utils';

import { LyricBlock } from './lyric-block.js';

const LynxUIComponents = LynxUIComponentsRegistry.list;

const lyricLines: string[] = [
  'I saw it bloom,',
  'Like Tokyo in the spring,',
  'One afternoon,',
  'My Tokyo, happening,',
  'The baby blue skies,',
  'Broke \'em in for the first time,',
  'As it opened right before my very eyes.',
];

type ComponentDisplay = {
  data: LynxUIComponentDef;
  checked: boolean;
  onClick?: (id: LynxUIComponentId) => void;
};

type ActBloomProps = {
  studioViewMode: StudioViewMode;
  focusedComponent: LynxUIComponentId;
};

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
        .ASSET_PREFIX as string}/${
        id === 'dialog' ? 'OffstageActDialog' : 'ActButton'
      }.lynx.bundle?fullscreen=true&luna_theme=${
        id === 'button' ? 'light' : 'dark'
      }`,
    );
  }, []);

  return (
    <view className='relative size-full'>
      <view className='absolute h-full w-full luna-gradient flex flex-col justify-center px-[48px]'>
        <LyricBlock
          lines={lyricLines}
          title='Tokyo'
          artist='Luna Shadows'
        />
      </view>
      <view
        className={cn(
          'absolute bottom-0 h-full w-full bg-canvas transition-all ease-in-out duration-300 overflow-hidden',
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
          <text className='text-start text-xl text-content font-semibold'>
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
export type { ActBloomProps };

function getSavedComponent(): LynxUIComponentId {
  const savedComponent: string | null = explorerRead(
    LUNA_SAVED_COMPONENT,
    null,
  );
  if (
    savedComponent
    && LynxUIComponents.some(component => component.id === savedComponent)
  ) {
    return savedComponent as LynxUIComponentId;
  }
  return LUNA_DEFAULT_COMPONENT;
}

function saveComponent(id: LynxUIComponentId) {
  explorerSave(LUNA_SAVED_COMPONENT, id);
}

function ComponentItem(
  { data, checked, onClick }: ComponentDisplay,
) {
  return (
    <text
      className={cn(
        'px-[8px] py-[2px] ui-checked:py-[12px] text-lg ui-checked:transform-[scale(1.2)] ui-checked:font-semibold transition-all duration-300 ease-in-out',
        data.demoReady
          ? 'text-content hover:opacity-50'
          : 'text-content-muted opacity-50',
        checked && 'ui-checked',
      )}
      bindtap={data.demoReady ? () => onClick?.(data.id) : undefined}
    >
      {data.name}
    </text>
  );
}
