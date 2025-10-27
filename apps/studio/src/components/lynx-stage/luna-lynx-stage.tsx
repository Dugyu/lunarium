import '@lynx-js/web-core/index.css';
import '@lynx-js/web-elements/index.css';
import '@lynx-js/web-core';
import '@lynx-js/web-elements/all';

import type { LynxView } from '@lynx-js/web-core';
import { useEffect, useLayoutEffect, useRef } from 'react';

import type { LynxUIComponentName } from '@/types';

type LunaLynxStageProps = {
  entry: string;
  lunaTheme: 'luna-light' | 'luna-dark';
  studioViewMode: 'compare' | 'focus' | 'lineup';
  focusedComponent: LynxUIComponentName;
  onFocusedChange?: (name: LynxUIComponentName) => void;
};

function LunaLynxStage(
  { entry, lunaTheme, studioViewMode, focusedComponent, onFocusedChange }:
    LunaLynxStageProps,
) {
  const ref = useRef<LynxView | null>(null);

  useEffect(() => {
    ref.current!.onNativeModulesCall = (
      name,
      data,
      moduleName,
    ) => {
      if (moduleName === 'bridge' && name === 'setFocusedComponent') {
        const name: LynxUIComponentName =
          (data as { name: LynxUIComponentName }).name;

        onFocusedChange?.(name);
        return { entry, focusedComponent: name };
      }
    };
  }, [entry, onFocusedChange]);

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
    });
  }, [lunaTheme, studioViewMode, focusedComponent]);

  return (
    <lynx-view
      lynx-group-id={7}
      ref={ref}
    >
    </lynx-view>
  );
}

export { LunaLynxStage };
