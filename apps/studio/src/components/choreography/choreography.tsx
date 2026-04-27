// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { LayoutGroup } from 'motion/react';

import type { BridgeCall } from '@/components/lynx-stage';
import type { LunaThemeMode, LunaThemeVariant, StudioViewMode } from '@/types';

import { DynamicView } from './dynamic-view.tsx';
import { useControllableState } from './use-controllable-state';

type ChoreographyProps = {
  viewMode: StudioViewMode;
  className?: string;
  onBridgeCall?: (call: BridgeCall) => unknown;
  themeVariant?: LunaThemeVariant;
  themeMode?: LunaThemeMode;
  defaultThemeVariant?: LunaThemeVariant;
  defaultThemeMode?: LunaThemeMode;
  onThemeVariantChange?: (variant: LunaThemeVariant) => void;
  onThemeModeChange?: (mode: LunaThemeMode) => void;
};

function Choreography(
  {
    viewMode = 'compare',
    className,
    onBridgeCall,
    themeVariant,
    themeMode,
    defaultThemeVariant = 'lunaris',
    defaultThemeMode = 'dark',
    onThemeVariantChange,
    onThemeModeChange,
  }: ChoreographyProps,
) {
  const [resolvedVariant] = useControllableState(
    themeVariant,
    defaultThemeVariant,
    onThemeVariantChange,
  );
  const [resolvedMode] = useControllableState(
    themeMode,
    defaultThemeMode,
    onThemeModeChange,
  );

  return (
    <LayoutGroup id='luna-studio'>
      <DynamicView
        mode={viewMode}
        key='luna-studio-dynamic-view'
        className={className}
        onBridgeCall={onBridgeCall}
        themeVariant={resolvedVariant}
        themeMode={resolvedMode}
      />
    </LayoutGroup>
  );
}

export { Choreography };

export type { ChoreographyProps };
