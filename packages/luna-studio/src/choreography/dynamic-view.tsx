// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { clsx } from 'clsx';
import { AnimatePresence } from 'motion/react';
import type { SpringOptions, Transition } from 'motion/react';
import type {
  JSX,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
} from 'react';
import { useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import {
  MotionPresentation,
  MotionStage,
  MotionStageContainer,
} from '@dugyu/luna-stage/motion';

import { StudioLunaLynxStage } from '../lynx-stage';
import type { LynxRuntimeCall } from '../lynx-stage';
import type {
  LunaThemeMode,
  LunaThemeVariant,
  StageEntry,
  StudioLayout,
  StudioViewMode,
} from '../types';
import type { StageEvent } from './types';
import { getStageWorldState } from '../utils/world';

type RenderData = StageEntry & {
  world: { x: number; y: number; z: number };
  zIndex: number;
  maskOpacity: number;
};

type FocusableStageEntry = StageEntry & {
  componentId: string;
};

const slidingVariants = {
  initial: { opacity: 0, x: -300 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 300 },
};

const presentationTransition: Transition = {
  type: 'spring',
  visualDuration: 0.3,
  bounce: 0.3,
};

const fitTransition: SpringOptions = { visualDuration: 0.8, bounce: 0.1 };

const DEFAULT_FOCUSED = 'button';

function cn(...inputs: (string | false | null | undefined)[]) {
  return twMerge(clsx(inputs));
}

function hasComponentId(stage: StageEntry): stage is FocusableStageEntry {
  return Boolean(stage.componentId);
}

type DynamicViewProps = {
  /** Stage layout data for all supported studio view modes. */
  layout: StudioLayout;
  /** Active mode selecting which layout slice to render. */
  mode?: StudioViewMode;
  className?: string;
  /** Resolved theme variant passed down to rendered Lynx stages. */
  themeVariant?: LunaThemeVariant;
  /** Resolved theme mode passed down to rendered Lynx stages. */
  themeMode?: LunaThemeMode;
  /** Chooses whether pointer interaction is handled by Lynx content or the outer Web container. */
  interactionTarget?: 'lynx' | 'container';
  /** Receives generic runtime calls emitted from the embedded Lynx content. */
  onLynxRuntimeCall?: (call: LynxRuntimeCall) => unknown;
  /** Receives Web container interaction events for the rendered stages. */
  onStageEvent?: (event: StageEvent) => void;
};

function DynamicView({
  layout,
  mode = 'compare',
  className,
  themeVariant = 'lunaris',
  themeMode = 'dark',
  interactionTarget = 'lynx',
  onLynxRuntimeCall,
  onStageEvent,
}: DynamicViewProps): JSX.Element {
  const [focused, setFocused] = useState<string>(DEFAULT_FOCUSED);
  const containerInteractive = interactionTarget === 'container';

  const handleLynxRuntimeCall = useMemo(() => {
    return (call: LynxRuntimeCall) => {
      if (call.name === 'setFocusedComponent') {
        const component = (call.data as { id: string }).id;
        setFocused(component);
      }
      return onLynxRuntimeCall?.(call);
    };
  }, [onLynxRuntimeCall]);

  const handleStageEvent = useMemo(() => {
    return (
      type: StageEvent['type'],
      stage: StageEntry,
      nativeEvent: MouseEvent | PointerEvent,
    ) => {
      onStageEvent?.({
        type,
        viewMode: mode,
        stage,
        nativeEvent,
      });
    };
  }, [mode, onStageEvent]);

  function getStageContainerEventHandlers(stage: StageEntry) {
    if (!containerInteractive) return undefined;
    return {
      onClick: (e: ReactMouseEvent) => {
        handleStageEvent('click', stage, e.nativeEvent);
      },
      onPointerCancel: (e: ReactPointerEvent) => {
        handleStageEvent('pointercancel', stage, e.nativeEvent);
      },
      onPointerDown: (e: ReactPointerEvent) => {
        handleStageEvent('pointerdown', stage, e.nativeEvent);
      },
      onPointerUp: (e: ReactPointerEvent) => {
        handleStageEvent('pointerup', stage, e.nativeEvent);
      },
    };
  }

  const rendered: RenderData[] = useMemo(() => {
    const stages = layout[mode];
    const components = stages.filter(stage => hasComponentId(stage));
    const backgroundComponents = components.filter(stage =>
      stage.componentId !== focused
    );

    const mid = (backgroundComponents.length - 1) / 2;
    const focusedIndex = components.findIndex(d => d.componentId === focused);

    return stages.map((stage) => {
      const compOrder = backgroundComponents.findIndex(d =>
        d.componentId === stage.componentId
      );
      const escape = compOrder === -1;
      const { world, zIndex, maskOpacity } = getStageWorldState({
        mode,
        compOrder,
        mid,
        focusedIndex,
        escape,
      });

      return {
        ...stage,
        world,
        zIndex,
        maskOpacity,
      };
    });
  }, [focused, layout, mode]);

  return (
    <div
      className={cn(
        'size-full gap-4 pointer-events-none relative',
        // Compare mode must stretch cross-axis height; centering would let each
        // stage item shrink to the container-motion anchor's intrinsic 4px height.
        mode === 'compare' && 'flex flex-row items-stretch justify-between',
        mode === 'focus' && 'grid grid-cols-3 grid-rows-1',
        mode === 'lineup' && 'grid grid-cols-5 grid-rows-2',
        className,
      )}
    >
      <AnimatePresence mode='popLayout'>
        {rendered.map((stage) => {
          return (
            <MotionStageContainer
              layoutId={stage.id}
              key={stage.id}
              className={stage.className}
              {...getStageContainerEventHandlers(stage)}
              style={{
                zIndex: stage.zIndex,
                pointerEvents: containerInteractive ? 'auto' : 'none',
              }}
            >
              <MotionPresentation
                key={stage.id}
                variants={slidingVariants}
                initial='initial'
                animate='animate'
                exit='exit'
                transition={presentationTransition}
              >
                <MotionStage
                  fitProgress={0}
                  fitTransition={fitTransition}
                  world={stage.world}
                  focalLength={mode === 'focus' ? 500 : 0}
                  className={themeMode === 'light'
                    ? 'bg-black opacity-[0.04]'
                    : 'bg-white opacity-5'}
                  contentInteractive={interactionTarget === 'lynx'}
                  maskColor={themeMode === 'light' ? '#f5f5f5' : '#00000080'}
                  maskOpacity={stage.maskOpacity}
                >
                  <StudioLunaLynxStage
                    entry={stage.entry}
                    lunaTheme={mode === 'compare'
                      ? stage.theme
                      : `${themeVariant}-${themeMode}`}
                    lunaThemeVariant={themeVariant}
                    interactive={interactionTarget === 'lynx'}
                    studioViewMode={mode}
                    focusedComponent={focused}
                    onLynxRuntimeCall={handleLynxRuntimeCall}
                    {...(hasComponentId(stage)
                      ? { componentEntry: stage.componentId }
                      : {})}
                  />
                </MotionStage>
              </MotionPresentation>
            </MotionStageContainer>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export type { DynamicViewProps };
export { DynamicView };
