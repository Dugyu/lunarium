// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { useState } from 'react';

import { Choreography } from '@dugyu/luna-studio';
import type {
  LunaThemeMode,
  LunaThemeVariant,
  StudioViewMode,
} from '@dugyu/luna-studio';

import { useThemeKeyboardControls } from '@/components/studio/use-theme-keyboard-controls';

import {
  createDemoInteractionHandler,
  createDemoResolveFocusKey,
  createDemoStageGlobalPropsBuilder,
} from './interaction';
import { lunaStudioDemoLayout, lunaStudioDemoModeGrid } from './layout';

const VIEW_MODES: StudioViewMode[] = ['compare', 'focus', 'lineup'];

const resolveFocusKey = createDemoResolveFocusKey(lunaStudioDemoLayout);
const buildStageGlobalProps = createDemoStageGlobalPropsBuilder();

function LunaStudioAdvancedDemo() {
  const [viewMode, setViewMode] = useState<StudioViewMode>('compare');
  const [themeMode, setThemeMode] = useState<LunaThemeMode>('dark');
  const [themeVariant, setThemeVariant] = useState<LunaThemeVariant>('lunaris');

  useThemeKeyboardControls({
    enabled: true,
    onThemeVariantChange: setThemeVariant,
    onThemeModeChange: setThemeMode,
  });

  return (
    <div className='flex h-screen w-screen flex-col bg-[#0d0d0d] text-white'>
      <div className='flex flex-none flex-wrap items-center justify-center gap-3 px-6 py-4'>
        {VIEW_MODES.map((mode) => {
          const active = mode === viewMode;
          return (
            <button
              key={mode}
              className={[
                'rounded-full border px-4 py-2 text-sm capitalize transition-colors',
                active
                  ? 'border-white bg-white text-black'
                  : 'border-white/20 bg-transparent text-white',
              ].join(' ')}
              onClick={() => setViewMode(mode)}
              type='button'
            >
              {mode}
            </button>
          );
        })}
        <div className='mx-2 h-6 w-px bg-white/10' />
        <button
          className={[
            'rounded-full border px-4 py-2 text-sm transition-colors',
            themeVariant === 'luna'
              ? 'border-white bg-white text-black'
              : 'border-white/20 bg-transparent text-white',
          ].join(' ')}
          onClick={() => setThemeVariant('luna')}
          type='button'
        >
          luna
        </button>
        <button
          className={[
            'rounded-full border px-4 py-2 text-sm transition-colors',
            themeVariant === 'lunaris'
              ? 'border-white bg-white text-black'
              : 'border-white/20 bg-transparent text-white',
          ].join(' ')}
          onClick={() => setThemeVariant('lunaris')}
          type='button'
        >
          lunaris
        </button>
        <div className='mx-2 h-6 w-px bg-white/10' />
        <button
          className={[
            'rounded-full border px-4 py-2 text-sm transition-colors',
            themeMode === 'light'
              ? 'border-white bg-white text-black'
              : 'border-white/20 bg-transparent text-white',
          ].join(' ')}
          onClick={() => setThemeMode('light')}
          type='button'
        >
          light
        </button>
        <button
          className={[
            'rounded-full border px-4 py-2 text-sm transition-colors',
            themeMode === 'dark'
              ? 'border-white bg-white text-black'
              : 'border-white/20 bg-transparent text-white',
          ].join(' ')}
          onClick={() => setThemeMode('dark')}
          type='button'
        >
          dark
        </button>
      </div>
      <div className='min-h-0 flex-1 p-6'>
        <Choreography
          className='h-full gap-4'
          layout={lunaStudioDemoLayout}
          modeGrid={lunaStudioDemoModeGrid}
          viewMode={viewMode}
          defaultFocusKey='button'
          resolveFocusKey={resolveFocusKey}
          buildStageGlobalProps={buildStageGlobalProps}
          interactionTarget='content'
          onInteraction={createDemoInteractionHandler({
            onThemeModeChange: setThemeMode,
            onThemeVariantChange: setThemeVariant,
          })}
          themeVariant={themeVariant}
          themeMode={themeMode}
        />
      </div>
    </div>
  );
}

export { LunaStudioAdvancedDemo };
