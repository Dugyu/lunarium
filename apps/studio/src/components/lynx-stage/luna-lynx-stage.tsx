import '@lynx-js/web-core/index.css';
import '@lynx-js/web-elements/index.css';
import '@lynx-js/web-core';
import '@lynx-js/web-elements/all';

import type { LynxView } from '@lynx-js/web-core';
import { useEffect, useLayoutEffect, useRef } from 'react';

import type {
  LunaThemeKey,
  LunaThemeVariant,
  LynxUIComponentName,
  MoonriseEvent,
  StudioViewMode,
} from '@/types';

type LunaLynxStageProps = {
  entry: string;
  lunaTheme?: LunaThemeKey;
  lunaThemeVariant?: LunaThemeVariant;
  studioViewMode: StudioViewMode;
  focusedComponent: LynxUIComponentName;
  onFocusedChange?: (name: LynxUIComponentName) => void;
  onMoonriseChange?: (event: MoonriseEvent) => void;
  componentEntry?: LynxUIComponentName;
};

function LunaLynxStage(
  {
    entry,
    lunaTheme = 'luna-light',
    lunaThemeVariant = 'luna',
    studioViewMode,
    focusedComponent,
    onFocusedChange,
    onMoonriseChange,
    componentEntry,
  }: LunaLynxStageProps,
) {
  const ref = useRef<LynxView | null>(null);

  useEffect(() => {
    ref.current!.onNativeModulesCall = (
      name,
      data,
      moduleName,
    ) => {
      if (moduleName === 'bridge') {
        if (name === 'setFocusedComponent') {
          const componentName: LynxUIComponentName =
            (data as { name: LynxUIComponentName }).name;
          onFocusedChange?.(componentName);
          return { entry, focusedComponent: componentName };
        } else if (name === 'setMoonriseState') {
          onMoonriseChange?.(data as MoonriseEvent);
          return { entry, moonriseEvent: data as MoonriseEvent };
        }
      }
    };
  }, [entry, onFocusedChange, onMoonriseChange]);

  useLayoutEffect(() => {
    ref.current!.url = `/${entry}.web.bundle`;
    ref.current!.style.width = '100%';
    ref.current!.style.height = '100%';
    ref.current!.style.pointerEvents = 'all';
  }, [entry]);

  useLayoutEffect(() => {
    ref.current!.updateGlobalProps({
      lunaTheme,
      studioViewMode,
      focusedComponent,
      componentEntry,
      lunaThemeVariant,
    });
  }, [
    lunaTheme,
    studioViewMode,
    focusedComponent,
    componentEntry,
    lunaThemeVariant,
  ]);

  return (
    <lynx-view
      lynx-group-id={7}
      ref={ref}
    >
    </lynx-view>
  );
}

export { LunaLynxStage };
