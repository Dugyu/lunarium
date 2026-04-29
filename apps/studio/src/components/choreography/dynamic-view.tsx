// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { AnimatePresence } from 'motion/react';
import type { SpringOptions, Transition } from 'motion/react';
import type {
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
} from 'react';
import { useMemo, useState } from 'react';

import { StudioLunaLynxStage } from '@/components/lynx-stage';
import type { LynxRuntimeCall } from '@/components/lynx-stage';
import {
  MotionPresentation,
  MotionStage,
  MotionStageContainer,
} from '@/components/mockup-motion';
import type { LunaThemeMode, LunaThemeVariant, StudioViewMode } from '@/types';
import { cn } from '@/utils';

import type { StageEntry, StageEvent, StudioLayout } from './types';

type WorldPos = {
  x: number;
  y: number;
  z: number;
};

type RenderData = StageEntry & {
  world: WorldPos;
  zIndex: number;
  maskOpacity: number;
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

const WORLD_ORIGIN: WorldPos = { x: 0, y: 0, z: 0 };

type DynamicViewProps = {
  /** Stage layout data for all supported studio view modes. */
  layout: StudioLayout;
  /** Active mode selecting which layout slice to render. */
  mode?: StudioViewMode;
  className?: string;
  /** Resolved theme variant passed down to rendered Lynx stages. */
  themeVariant: LunaThemeVariant;
  /** Resolved theme mode passed down to rendered Lynx stages. */
  themeMode: LunaThemeMode;
  /** Chooses whether pointer interaction is handled by Lynx content or the outer Web container. */
  interactionTarget?: 'lynx' | 'container';
  /** Receives generic runtime calls emitted from the embedded Lynx content. */
  onLynxRuntimeCall?: (call: LynxRuntimeCall) => unknown;
  /** Receives Web container interaction events for the rendered stages. */
  onStageEvent?: (event: StageEvent) => void;
};

function DynamicView(
  {
    layout,
    mode = 'compare',
    className,
    themeVariant,
    themeMode,
    interactionTarget = 'lynx',
    onLynxRuntimeCall,
    onStageEvent,
  }: DynamicViewProps,
) {
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
    const components = stages
      .filter(d => d.componentId);
    const backgroundComponents = components.filter(d =>
      d.componentId !== focused
    );

    const mid = (backgroundComponents.length - 1) / 2;

    const focusedIndex = components.findIndex(d => d.componentId === focused);

    const items = stages.map((stage) => {
      const compOrder = backgroundComponents.findIndex(d =>
        d.componentId === stage.componentId
      );
      const escape = compOrder === -1;

      const direction = (compOrder - mid) > 0 ? 1 : -1;

      const theta = ((compOrder - mid) * 20 + direction * focusedIndex * 2)
        / 180 * Math.PI;

      const world: WorldPos = mode === 'focus'
        ? {
          x: escape
            ? 0
            : Math.sin(theta) * 600,
          y: 0,
          z: escape
            ? 0
            : -Math.cos(theta) * 600, // -(1.5 - Math.abs((mid - compOrder) / mid)) * 500,
        }
        : WORLD_ORIGIN;

      const zIndex = mode === 'focus'
        ? (escape ? 100 : Math.ceil(Math.abs(compOrder - mid) * 2))
        : 0;

      const maskOpacity = mode === 'focus'
        ? (escape ? 0 : 1 - Math.abs(theta * 2 / Math.PI) * 0.6)
        : 0;

      const data = {
        ...stage,
        world,
        zIndex: zIndex,
        maskOpacity: maskOpacity * 0.5,
      };
      return data;
    });
    return items;
  }, [focused, layout, mode]);

  return (
    <div
      className={cn(
        'size-full gap-4 pointer-events-none relative',
        mode === 'compare' && 'flex flex-row items-center justify-between',
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
              className={cn(
                'h-full',
                stage.className,
              )}
              {...getStageContainerEventHandlers(stage)}
              style={{
                zIndex: stage.zIndex,
                pointerEvents: containerInteractive ? 'auto' : 'none',
              }}
            >
              <MotionPresentation
                key={stage.id}
                style={{ opacity: 0.4 }}
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
                  maskColor={themeMode === 'light' ? '#f5f5f5' : '#000000'}
                  maskOpacity={themeMode === 'light'
                    ? stage.maskOpacity
                    : stage.maskOpacity * 0.2}
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
                    componentEntry={stage.componentId}
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
