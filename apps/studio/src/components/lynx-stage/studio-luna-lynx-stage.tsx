// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { useMemo } from 'react';

import { LunaLynxStage } from '@dugyu/luna-stage';

import type {
  LunaThemeKey,
  LunaThemeVariant,
  LynxUIComponentId,
  MoonriseEvent,
  StudioViewMode,
} from '@/types';

type StudioLunaLynxStageProps = {
  bundleBaseUrl?: string;
  entry: string;
  lunaTheme?: LunaThemeKey;
  lunaThemeVariant?: LunaThemeVariant;
  studioViewMode: StudioViewMode;
  focusedComponent: LynxUIComponentId;
  onFocusedChange?: (name: LynxUIComponentId) => void;
  onMoonriseChange?: (event: MoonriseEvent) => void;
  componentEntry?: LynxUIComponentId;
};

function StudioLunaLynxStage({
  bundleBaseUrl,
  entry,
  lunaTheme,
  lunaThemeVariant,
  studioViewMode,
  focusedComponent,
  onFocusedChange,
  onMoonriseChange,
  componentEntry,
}: StudioLunaLynxStageProps) {
  const extraGlobalProps = useMemo(() => ({
    studioViewMode,
    focusedComponent,
    ...(componentEntry !== undefined ? { componentEntry } : {}),
  }), [studioViewMode, focusedComponent, componentEntry]);

  const handleNativeModulesCall = useMemo(() => (
    (name: string, data: unknown, moduleName: string) => {
      if (moduleName !== 'bridge') return;
      if (name === 'setFocusedComponent') {
        const component = (data as { id: LynxUIComponentId }).id;
        onFocusedChange?.(component);
        return { entry, focusedComponent: component };
      }
      if (name === 'setMoonriseState') {
        onMoonriseChange?.(data as MoonriseEvent);
        return { entry, moonriseEvent: data as MoonriseEvent };
      }
    }
  ), [entry, onFocusedChange, onMoonriseChange]);

  return (
    <LunaLynxStage
      bundleBaseUrl={bundleBaseUrl}
      entry={entry}
      lunaTheme={lunaTheme}
      lunaThemeVariant={lunaThemeVariant}
      extraGlobalProps={extraGlobalProps}
      onNativeModulesCall={handleNativeModulesCall}
    />
  );
}

export { StudioLunaLynxStage };
export type { StudioLunaLynxStageProps };
