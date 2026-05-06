// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { useState } from 'react';

import { Choreography } from '@dugyu/luna-studio';
import type {
  InteractionParams,
  LunaThemeKey,
  LunaThemeMode,
  LunaThemeVariant,
  StudioViewMode,
} from '@dugyu/luna-studio';

import { useThemeKeyboardControls } from '@/components/studio/use-theme-keyboard-controls';

import {
  createDemoResolveFocusKey,
  createDemoStageGlobalPropsBuilder,
} from './interaction';
import { lunaStudioDemoLayout, lunaStudioDemoModeGrid } from './layout';

const VIEW_MODES: StudioViewMode[] = ['compare', 'focus', 'lineup'];

const resolveFocusKey = createDemoResolveFocusKey(lunaStudioDemoLayout);

type StudioEvent = {
  type:
    | 'studioThemeVariant'
    | 'studioThemeMode'
    | 'studioAutoplay'
    | 'requestViewModeChange';
  payload?: unknown;
  source?: unknown;
};

function isStudioEvent(data: unknown): data is StudioEvent {
  if (data === null || typeof data !== 'object') return false;

  const event = data as { type?: unknown };
  return event.type === 'studioThemeVariant'
    || event.type === 'studioThemeMode'
    || event.type === 'studioAutoplay'
    || event.type === 'requestViewModeChange';
}

function LunaStudioAdvancedDemo() {
  const [viewMode, setViewMode] = useState<StudioViewMode>('compare');
  const [themeVariant, setThemeVariant] = useState<LunaThemeVariant>('lunaris');
  const [themeMode, setThemeMode] = useState<LunaThemeMode>('dark');
  const [studioAutoplay, setStudioAutoplay] = useState(false);

  const studioThemeKey: LunaThemeKey = `${themeVariant}-${themeMode}`;

  const setStudioThemeVariant = (variant: LunaThemeVariant) => {
    setThemeVariant(variant);
  };

  const setStudioThemeMode = (mode: LunaThemeMode) => {
    setThemeMode(mode);
  };

  const handleRequestViewModeChange = (params: {
    suggestedViewMode?: StudioViewMode;
  }) => {
    setViewMode((prevMode) => {
      if (params.suggestedViewMode !== undefined) {
        return params.suggestedViewMode;
      }

      const index = VIEW_MODES.indexOf(prevMode);
      if (index < 0) return VIEW_MODES[0];
      return VIEW_MODES[(index + 1) % VIEW_MODES.length];
    });
  };

  function handleInteraction(interaction: InteractionParams) {
    if (interaction.target !== 'content') return;
    const call = interaction.runtimeCall;
    if (call.name !== 'emitStudioEvent') return;
    if (!isStudioEvent(call.data)) return;
    const event = call.data;
    if (event.type === 'studioThemeVariant') {
      if (event.payload === 'luna' || event.payload === 'lunaris') {
        setStudioThemeVariant(event.payload);
      }
    } else if (event.type === 'studioThemeMode') {
      if (event.payload === 'light' || event.payload === 'dark') {
        setStudioThemeMode(event.payload);
      }
    } else if (event.type === 'studioAutoplay') {
      if (typeof event.payload === 'boolean') {
        setStudioAutoplay(event.payload);
      }
    } else if (event.type === 'requestViewModeChange') {
      const suggestedViewMode = (() => {
        const payload = event.payload;
        if (payload === null || typeof payload !== 'object') return undefined;
        const candidate = (payload as { suggestedViewMode?: unknown })
          .suggestedViewMode;
        return candidate === 'compare' || candidate === 'focus'
            || candidate === 'lineup'
          ? candidate
          : undefined;
      })();

      handleRequestViewModeChange({ suggestedViewMode });
    }
  }

  const containerClassName = themeMode === 'light'
    ? 'bg-[#f5f5f5] text-black'
    : 'bg-[#0d0d0d] text-white';

  const dividerClassName = themeMode === 'light'
    ? 'bg-black/10'
    : 'bg-white/10';

  const chipBaseClassName =
    'rounded-full border px-4 py-2 text-sm transition-colors';

  const chipClassName = (active: boolean) => {
    if (themeMode === 'light') {
      return [
        chipBaseClassName,
        active
          ? 'border-black bg-black text-white'
          : 'border-black/20 bg-transparent text-black',
      ].join(' ');
    }

    return [
      chipBaseClassName,
      active
        ? 'border-white bg-white text-black'
        : 'border-white/20 bg-transparent text-white',
    ].join(' ');
  };

  useThemeKeyboardControls({
    enabled: true,
    onThemeVariantChange: setStudioThemeVariant,
    onThemeModeChange: setStudioThemeMode,
  });

  return (
    <div
      className={[
        'relative h-screen w-screen overflow-hidden',
        containerClassName,
      ].join(
        ' ',
      )}
    >
      <div className='relative h-full w-full p-6 pt-24'>
        <Choreography
          className='gap-4'
          layout={lunaStudioDemoLayout}
          modeGrid={lunaStudioDemoModeGrid}
          viewMode={viewMode}
          defaultFocusKey='button'
          resolveFocusKey={resolveFocusKey}
          buildStageGlobalProps={createDemoStageGlobalPropsBuilder({
            studioThemeKey,
            studioAutoplay,
          })}
          interactionTarget='content'
          onInteraction={handleInteraction}
          themeKey={studioThemeKey}
        />
      </div>
      <div className='absolute inset-x-0 top-0 z-10 flex flex-wrap items-center justify-center gap-3 px-6 py-4'>
        {VIEW_MODES.map((mode) => {
          const active = mode === viewMode;
          return (
            <button
              key={mode}
              className={chipClassName(active)}
              onClick={() => setViewMode(mode)}
              type='button'
            >
              {mode}
            </button>
          );
        })}
        <div className={['mx-2 h-6 w-px', dividerClassName].join(' ')} />
        <button
          className={chipClassName(themeVariant === 'luna')}
          onClick={() => setStudioThemeVariant('luna')}
          type='button'
        >
          luna
        </button>
        <button
          className={chipClassName(themeVariant === 'lunaris')}
          onClick={() => setStudioThemeVariant('lunaris')}
          type='button'
        >
          lunaris
        </button>
        <div className={['mx-2 h-6 w-px', dividerClassName].join(' ')} />
        <button
          className={chipClassName(themeMode === 'light')}
          onClick={() => setStudioThemeMode('light')}
          type='button'
        >
          light
        </button>
        <button
          className={chipClassName(themeMode === 'dark')}
          onClick={() => setStudioThemeMode('dark')}
          type='button'
        >
          dark
        </button>
      </div>
    </div>
  );
}

export { LunaStudioAdvancedDemo };
