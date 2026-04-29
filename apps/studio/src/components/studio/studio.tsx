// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { useState } from 'react';

import { Choreography } from '@dugyu/luna-studio';
import type { LynxRuntimeCall } from '@dugyu/luna-studio';

import { MenuBar } from '@/components/menu-bar';
import { StudioFrame } from '@/components/studio-frame';
import { STARTING_MODE, STARTING_VARIANT } from '@/constants';
import type { LunaThemeMode, LunaThemeVariant, StudioViewMode } from '@/types';
import type { MoonriseEvent } from '@/types/stage';
import { cn } from '@/utils';

import { studioLayout } from './studio-layout';
import { useThemeKeyboardControls } from './use-theme-keyboard-controls';

const viewModes: StudioViewMode[] = ['compare', 'focus', 'lineup'];

function isMoonriseEvent(data: unknown): data is MoonriseEvent {
  if (data === null || typeof data !== 'object') return false;

  const event = data as { field?: unknown; value?: unknown };
  return event.field === 'luna-variant'
    || event.field === 'light-mode'
    || event.field === 'autoplay'
    || event.field === 'trust'
    || event.field === 'subscribe';
}

function Studio() {
  const [viewMode, setViewMode] = useState<StudioViewMode>('compare');
  const [themeMode, setThemeMode] = useState<LunaThemeMode>(STARTING_MODE);
  const [themeVariant, setThemeVariant] = useState<LunaThemeVariant>(
    STARTING_VARIANT,
  );

  function handleLynxRuntimeCall(
    call: LynxRuntimeCall,
  ) {
    if (call.name !== 'setMoonriseState') return;
    if (!isMoonriseEvent(call.data)) return;
    const event = call.data;
    if (event.field === 'luna-variant') {
      setThemeVariant(event.value);
    } else if (event.field === 'light-mode') {
      setThemeMode(event.value === true ? 'light' : 'dark');
    }
  }

  useThemeKeyboardControls({
    enabled: true,
    onThemeVariantChange: setThemeVariant,
    onThemeModeChange: setThemeMode,
  });

  return (
    <StudioFrame
      className={cn(
        'pointer-events-auto relative luna-studio transition-all duration-300 ease-in-out',
        themeMode === 'light' ? 'bg-[#f5f5f5]' : 'bg-[#0d0d0d]',
      )}
    >
      <Choreography
        layout={studioLayout}
        viewMode={viewMode}
        interactionTarget={'lynx'}
        onLynxRuntimeCall={handleLynxRuntimeCall}
        themeVariant={themeVariant}
        themeMode={themeMode}
      />
      <MenuBar
        onViewModeChange={(i) => setViewMode(viewModes[i])}
        className='z-[1000]'
        themeMode={themeMode}
      />
    </StudioFrame>
  );
}

export { Studio };
