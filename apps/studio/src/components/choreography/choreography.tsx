// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { LayoutGroup } from 'motion/react';

import type { LynxRuntimeCall } from '@/components/lynx-stage';
import type { LunaThemeMode, LunaThemeVariant, StudioViewMode } from '@/types';

import { DynamicView } from './dynamic-view.tsx';
import type { StageEvent } from './types';
import { useControllableState } from './use-controllable-state';

type ChoreographyProps = {
  viewMode: StudioViewMode;
  className?: string;
  /** Chooses whether pointer interaction is handled by Lynx content or the outer Web container. */
  interactionTarget?: 'lynx' | 'container';
  /** Receives generic runtime calls emitted from the embedded Lynx content. */
  onLynxRuntimeCall?: (call: LynxRuntimeCall) => unknown;
  /** Receives Web container interaction events for the rendered stages. */
  onStageEvent?: (event: StageEvent) => void;
  themeVariant?: LunaThemeVariant;
  themeMode?: LunaThemeMode;
  /** Initial theme variant when used in uncontrolled mode. */
  defaultThemeVariant?: LunaThemeVariant;
  /** Initial theme mode when used in uncontrolled mode. */
  defaultThemeMode?: LunaThemeMode;
  onThemeVariantChange?: (variant: LunaThemeVariant) => void;
  onThemeModeChange?: (mode: LunaThemeMode) => void;
};

function Choreography(
  {
    viewMode = 'compare',
    className,
    interactionTarget,
    onLynxRuntimeCall,
    onStageEvent,
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
        onLynxRuntimeCall={onLynxRuntimeCall}
        onStageEvent={onStageEvent}
        themeVariant={resolvedVariant}
        themeMode={resolvedMode}
        interactionTarget={interactionTarget}
      />
    </LayoutGroup>
  );
}

export { Choreography };

export type { ChoreographyProps };
