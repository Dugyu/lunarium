// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { LayoutGroup } from 'motion/react';
import type { JSX } from 'react';

import type { LynxRuntimeCall } from '../lynx-stage';
import type {
  LunaThemeMode,
  LunaThemeVariant,
  StudioLayout,
  StudioViewMode,
} from '../types';
import { DynamicView } from './dynamic-view';
import type { StageEvent } from './types';

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

function Choreography({
  layout,
  viewMode = 'compare',
  themeVariant = 'lunaris',
  themeMode = 'dark',
  interactionTarget = 'lynx',
  className,
  onLynxRuntimeCall,
  onStageEvent,
}: ChoreographyProps): JSX.Element {
  return (
    <LayoutGroup id='luna-studio'>
      <DynamicView
        layout={layout}
        mode={viewMode}
        key='luna-studio-dynamic-view'
        themeVariant={themeVariant}
        themeMode={themeMode}
        interactionTarget={interactionTarget}
        {...(className !== undefined ? { className } : {})}
        {...(onLynxRuntimeCall !== undefined ? { onLynxRuntimeCall } : {})}
        {...(onStageEvent !== undefined ? { onStageEvent } : {})}
      />
    </LayoutGroup>
  );
}

export { Choreography };

export type { ChoreographyProps };
