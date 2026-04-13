// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { LayoutGroup } from 'motion/react';
import type { JSX } from 'react';

import type { StudioViewMode } from '@dugyu/luna-catalog';

import { DynamicView } from './dynamic-view.js';
import type { StageMeta, ViewSpec } from './types.js';

type ChoreographyProps = {
  viewMode: StudioViewMode;
  className?: string;
  onThemeModeChange?: (mode: 'light' | 'dark') => void;
  /** Override default stage configurations. */
  stages?: Record<string, StageMeta>;
  /** Override default layout configs per view mode. */
  layouts?: Record<StudioViewMode, ViewSpec[]>;
  /** Base URL for Lynx bundle files. @default '/' */
  bundleBaseUrl?: string;
};

function Choreography(
  {
    viewMode = 'compare',
    className,
    onThemeModeChange,
    stages,
    layouts,
    bundleBaseUrl,
  }: ChoreographyProps,
): JSX.Element {
  return (
    <LayoutGroup id='luna-studio'>
      <DynamicView
        mode={viewMode}
        key='luna-studio-dynamic-view'
        {...(className !== undefined && { className })}
        {...(onThemeModeChange !== undefined && { onThemeModeChange })}
        {...(stages !== undefined && { stages })}
        {...(layouts !== undefined && { layouts })}
        {...(bundleBaseUrl !== undefined && { bundleBaseUrl })}
      />
    </LayoutGroup>
  );
}

export { Choreography };

export type { ChoreographyProps };
