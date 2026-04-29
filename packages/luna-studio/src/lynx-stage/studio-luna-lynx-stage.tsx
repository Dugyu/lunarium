// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { useMemo } from 'react';
import type { JSX } from 'react';

import { LunaLynxStage } from '@dugyu/luna-stage/lynx';

import type { LunaThemeKey, LunaThemeVariant, StudioViewMode } from '../types';

/**
 * Generic runtime callback payload emitted from Lynx back into the host Web app.
 */
type LynxRuntimeCall = {
  /** Lynx bundle entry that emitted the runtime call. */
  entry: string;
  /** Runtime channel name, derived from the low-level native-module source. */
  channel: string;
  /** Runtime event name within the channel. */
  name: string;
  /** Opaque payload forwarded from the Lynx runtime. */
  data: unknown;
};

type StudioLunaLynxStageProps = {
  bundleBaseUrl?: string;
  entry: string;
  lunaTheme?: LunaThemeKey;
  lunaThemeVariant?: LunaThemeVariant;
  interactive?: boolean;
  studioViewMode: StudioViewMode;
  focusedComponent: string;
  /** Receives runtime calls emitted from the embedded Lynx content. */
  onLynxRuntimeCall?: (call: LynxRuntimeCall) => unknown;
  componentEntry?: string;
};

function StudioLunaLynxStage({
  bundleBaseUrl,
  entry,
  lunaTheme,
  lunaThemeVariant,
  interactive,
  studioViewMode,
  focusedComponent,
  onLynxRuntimeCall,
  componentEntry,
}: StudioLunaLynxStageProps): JSX.Element {
  const extraGlobalProps = useMemo(() => ({
    studioViewMode,
    focusedComponent,
    ...(componentEntry !== undefined ? { componentEntry } : {}),
  }), [studioViewMode, focusedComponent, componentEntry]);

  const handleNativeModulesCall = useMemo(() => (
    (name: string, data: unknown, channel: string) => {
      return onLynxRuntimeCall?.({
        entry,
        channel,
        name,
        data,
      });
    }
  ), [entry, onLynxRuntimeCall]);

  return (
    <LunaLynxStage
      entry={entry}
      extraGlobalProps={extraGlobalProps}
      onNativeModulesCall={handleNativeModulesCall}
      {...(bundleBaseUrl !== undefined ? { bundleBaseUrl } : {})}
      {...(lunaTheme !== undefined ? { lunaTheme } : {})}
      {...(lunaThemeVariant !== undefined ? { lunaThemeVariant } : {})}
      {...(interactive !== undefined ? { interactive } : {})}
    />
  );
}

export { StudioLunaLynxStage };
export type { LynxRuntimeCall, StudioLunaLynxStageProps };
