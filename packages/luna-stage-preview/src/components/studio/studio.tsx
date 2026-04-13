// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { useState } from 'react';
import type { JSX } from 'react';

import type { StudioViewMode } from '@dugyu/luna-catalog';

import { cn } from '../../utils/index.js';
import { Choreography } from '../choreography/index.js';
import type { StageMeta, ViewSpec } from '../choreography/types.js';
import { MenuBar } from '../menu-bar/index.js';
import { StudioFrame } from '../studio-frame/index.js';

const viewModes: StudioViewMode[] = ['compare', 'focus', 'lineup'];

type StudioProps = {
  /** Override default stage configurations. */
  stages?: Record<string, StageMeta>;
  /** Override default layout configs per view mode. */
  layouts?: Record<StudioViewMode, ViewSpec[]>;
  /**
   * Base URL for Lynx bundle files.
   * @default '/'
   */
  bundleBaseUrl?: string;
  /**
   * When true, adds extra vertical padding for screen recording layouts.
   * @default false
   */
  recordMode?: boolean;
};

function Studio(
  {
    stages,
    layouts,
    bundleBaseUrl,
    recordMode = false,
  }: StudioProps = {},
): JSX.Element {
  const [viewMode, setViewMode] = useState<StudioViewMode>('compare');
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('dark');

  return (
    <StudioFrame
      recordMode={recordMode}
      className={cn(
        'pointer-events-auto relative luna-studio transition-all duration-300 ease-in-out',
        themeMode === 'light' ? 'bg-[#f5f5f5]' : 'bg-[#0d0d0d]',
      )}
    >
      <Choreography
        viewMode={viewMode}
        onThemeModeChange={setThemeMode}
        {...(stages !== undefined && { stages })}
        {...(layouts !== undefined && { layouts })}
        {...(bundleBaseUrl !== undefined && { bundleBaseUrl })}
      />
      <MenuBar
        onViewModeChange={(i: number) => {
          const mode = viewModes[i];
          if (mode !== undefined) setViewMode(mode);
        }}
        className='z-[1000]'
        themeMode={themeMode}
      />
    </StudioFrame>
  );
}

export { Studio };
export type { StudioProps };
