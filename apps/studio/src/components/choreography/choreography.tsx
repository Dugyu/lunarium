// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { LayoutGroup } from 'motion/react';

import type { StudioViewMode } from '@/types';

import { DynamicView } from './dynamic-view.tsx';

type ChoreographyProps = {
  viewMode: StudioViewMode;
  className?: string;
  onThemeModeChange?: (mode: 'light' | 'dark') => void;
};

function Choreography(
  { viewMode = 'compare', className, onThemeModeChange }: ChoreographyProps,
) {
  return (
    <LayoutGroup id='luna-studio'>
      <DynamicView
        mode={viewMode}
        key='luna-studio-dynamic-view'
        className={className}
        onThemeModeChange={onThemeModeChange}
      />
    </LayoutGroup>
  );
}

export { Choreography };

export type { ChoreographyProps };
