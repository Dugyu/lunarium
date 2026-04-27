// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { useMemo } from 'react';

import { LunaLynxStage } from '@dugyu/luna-stage/lynx';

import type { LunaThemeKey, LunaThemeVariant, StudioViewMode } from '@/types';

type BridgeCall = { entry: string; name: string; data: unknown };

type StudioLunaLynxStageProps = {
  bundleBaseUrl?: string;
  entry: string;
  lunaTheme?: LunaThemeKey;
  lunaThemeVariant?: LunaThemeVariant;
  studioViewMode: StudioViewMode;
  focusedComponent: string;
  onBridgeCall?: (
    call: BridgeCall,
  ) => unknown;
  componentEntry?: string;
};

function StudioLunaLynxStage({
  bundleBaseUrl,
  entry,
  lunaTheme,
  lunaThemeVariant,
  studioViewMode,
  focusedComponent,
  onBridgeCall,
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
      const result = onBridgeCall?.({ entry, name, data });
      if (result !== undefined) return result;
      if (name === 'setFocusedComponent') {
        const component = (data as { id: string }).id;
        return { entry, focusedComponent: component };
      }
      if (name === 'setMoonriseState') {
        return { entry, moonriseEvent: data };
      }
    }
  ), [entry, onBridgeCall]);

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
export type { BridgeCall, StudioLunaLynxStageProps };
