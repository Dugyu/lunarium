// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { LayoutGroup } from 'motion/react';

import type { LynxRuntimeCall } from '@/components/lynx-stage';
import type { LunaThemeMode, LunaThemeVariant, StudioViewMode } from '@/types';

import { DynamicView } from './dynamic-view.tsx';
import type { StageEvent, StudioLayout } from './types';

type ChoreographyProps = {
  /** Fully resolved stage layout used by the choreography layer. */
  layout: StudioLayout;
  /** Active presentation mode for the current choreography render. */
  viewMode: StudioViewMode;
  className?: string;
  /** Chooses whether pointer interaction is handled by Lynx content or the outer Web container. */
  interactionTarget?: 'lynx' | 'container';
  /** Receives generic runtime calls emitted from the embedded Lynx content. */
  onLynxRuntimeCall?: (call: LynxRuntimeCall) => unknown;
  /** Receives Web container interaction events for the rendered stages. */
  onStageEvent?: (event: StageEvent) => void;
  /** Controlled theme variant for all rendered stages. */
  themeVariant?: LunaThemeVariant;
  /** Controlled theme mode for all rendered stages. */
  themeMode?: LunaThemeMode;
};

function Choreography(
  {
    layout,
    viewMode = 'compare',
    className,
    interactionTarget,
    onLynxRuntimeCall,
    onStageEvent,
    themeVariant,
    themeMode,
  }: ChoreographyProps,
) {
  return (
    <LayoutGroup id='luna-studio'>
      <DynamicView
        layout={layout}
        mode={viewMode}
        key='luna-studio-dynamic-view'
        className={className}
        onLynxRuntimeCall={onLynxRuntimeCall}
        onStageEvent={onStageEvent}
        themeVariant={themeVariant ?? 'lunaris'}
        themeMode={themeMode ?? 'dark'}
        interactionTarget={interactionTarget}
      />
    </LayoutGroup>
  );
}

export { Choreography };

export type { ChoreographyProps };
