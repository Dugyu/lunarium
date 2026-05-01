// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { AnimatePresence } from 'motion/react';
import type { SpringOptions, Transition } from 'motion/react';
import type {
  CSSProperties,
  JSX,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
} from 'react';
import { useMemo, useState } from 'react';

import {
  MotionPresentation,
  MotionStage,
  MotionStageContainer,
} from '@dugyu/luna-stage/motion';

import { StudioLynxStage } from '../lynx-stage';
import type {
  ChoreographyViewProps,
  InteractionParams,
  LynxRuntimeCall,
  StudioStage,
} from '../types';
import { getStageWorldState } from '../utils/world';

type RenderData = StudioStage & {
  world: { x: number; y: number; z: number };
  zIndex: number;
  maskOpacity: number;
};

type FocusableStudioStage = StudioStage & {
  focusKey: string;
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
const BASE_STYLE: CSSProperties = {
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  position: 'relative',
};

function hasFocusKey(stage: StudioStage): stage is FocusableStudioStage {
  return stage.focusKey !== undefined;
}

function createStageInteraction(
  stage: StudioStage,
  containerEvent: MouseEvent | PointerEvent,
): InteractionParams {
  return {
    target: 'stage',
    stageId: stage.id,
    entry: stage.entry,
    containerEvent,
  };
}

function createContentInteraction(
  stage: StudioStage,
  call: LynxRuntimeCall,
): InteractionParams {
  return {
    target: 'content',
    stageId: stage.id,
    entry: stage.entry,
    runtimeCall: call,
    ...(call.data !== undefined ? { payload: call.data } : {}),
  };
}

/**
 * Internal choreography renderer that resolves layout, focus state, interaction
 * normalization, and Lynx-stage wiring for the active presentation mode.
 */
function ChoreographyView({
  layout,
  modeGrid,
  mode = 'compare',
  defaultFocusKey,
  className,
  style,
  bundleBaseUrl,
  resolveFocusKey,
  buildStageGlobalProps,
  themeVariant = 'lunaris',
  themeMode = 'dark',
  interactionTarget = 'content',
  onLynxRuntimeCall,
  onInteraction,
}: ChoreographyViewProps): JSX.Element {
  const [activeFocusKey, setActiveFocusKey] = useState<string>(
    defaultFocusKey ?? '',
  );
  const containerInteractive = interactionTarget === 'stage';

  const containerGrid = modeGrid?.[mode];

  const handleInteraction = useMemo(() => {
    return (interaction: InteractionParams) => {
      const nextActiveFocusKey = resolveFocusKey?.(interaction);
      if (nextActiveFocusKey !== undefined) {
        setActiveFocusKey(nextActiveFocusKey);
      }
      return onInteraction?.(interaction);
    };
  }, [onInteraction, resolveFocusKey]);

  function getStageContainerEventHandlers(stage: StudioStage) {
    if (!containerInteractive) return undefined;
    // These handlers all normalize into `interaction.containerEvent`; consumers
    // can inspect `containerEvent.type` to distinguish click vs pointer events.
    return {
      onClick: (e: ReactMouseEvent) => {
        handleInteraction(
          createStageInteraction(stage, e.nativeEvent),
        );
      },
      onPointerCancel: (e: ReactPointerEvent) => {
        handleInteraction(
          createStageInteraction(stage, e.nativeEvent),
        );
      },
      onPointerDown: (e: ReactPointerEvent) => {
        handleInteraction(
          createStageInteraction(stage, e.nativeEvent),
        );
      },
      onPointerUp: (e: ReactPointerEvent) => {
        handleInteraction(
          createStageInteraction(stage, e.nativeEvent),
        );
      },
    };
  }

  function getStageRuntimeCallHandler(stage: StudioStage) {
    return (call: LynxRuntimeCall) => {
      handleInteraction(createContentInteraction(stage, call));
      return onLynxRuntimeCall?.(call);
    };
  }

  const resolvedActiveFocusKey = useMemo(() => {
    if (activeFocusKey !== '') return activeFocusKey;
    const firstFocusableStage = layout[mode].find(stage =>
      stage.focusKey !== undefined
    );
    return firstFocusableStage === undefined
      ? ''
      : firstFocusableStage.focusKey ?? '';
  }, [activeFocusKey, layout, mode]);

  const rendered: RenderData[] = useMemo(() => {
    const stages = layout[mode];
    const components = stages.filter(stage => hasFocusKey(stage));
    const backgroundComponents = components.filter(stage =>
      stage.focusKey !== resolvedActiveFocusKey
    );

    const mid = (backgroundComponents.length - 1) / 2;
    const focusedIndex = components.findIndex(d =>
      d.focusKey === resolvedActiveFocusKey
    );

    return stages.map((stage) => {
      const compOrder = backgroundComponents.findIndex(d =>
        d.focusKey === stage.focusKey
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
  }, [layout, mode, resolvedActiveFocusKey]);

  const containerStyle: CSSProperties | undefined = useMemo(() => {
    const baseGridStyle = containerGrid === undefined ? {} : {
      display: 'grid',
      gridTemplateColumns: `repeat(${containerGrid.cols}, minmax(0, 1fr))`,
      gridTemplateRows: `repeat(${containerGrid.rows}, minmax(0, 1fr))`,
      alignItems: 'stretch',
    };
    return {
      ...BASE_STYLE,
      ...baseGridStyle,
    };
  }, [containerGrid]);

  const mergedContainerStyle: CSSProperties = useMemo(() => {
    return {
      ...containerStyle,
      ...style,
    };
  }, [containerStyle, style]);

  const stageOutlineStyle: CSSProperties = useMemo(() => {
    return {
      backgroundColor: themeMode === 'light'
        ? 'rgb(0 0 0 / 0.04)'
        : 'rgb(255 255 255 / 0.05)',
    };
  }, [themeMode]);

  return (
    <div
      className={className}
      style={mergedContainerStyle}
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
                ...stage.style,
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
                  style={stageOutlineStyle}
                  contentInteractive={interactionTarget === 'content'}
                  maskColor={themeMode === 'light' ? '#f5f5f5' : '#00000080'}
                  maskOpacity={stage.maskOpacity}
                >
                  <StudioLynxStage
                    entry={stage.entry}
                    lunaTheme={mode === 'compare'
                      ? stage.theme
                      : `${themeVariant}-${themeMode}`}
                    lunaThemeVariant={themeVariant}
                    interactive={interactionTarget === 'content'}
                    onLynxRuntimeCall={getStageRuntimeCallHandler(stage)}
                    {...(() => {
                      const resolvedBundleBaseUrl = stage.bundleBaseUrl
                        ?? bundleBaseUrl;
                      return resolvedBundleBaseUrl === undefined
                        ? {}
                        : { bundleBaseUrl: resolvedBundleBaseUrl };
                    })()}
                    {...(() => {
                      const extraGlobalProps = buildStageGlobalProps?.({
                        stage,
                        viewMode: mode,
                        activeFocusKey: resolvedActiveFocusKey,
                        focusKey: stage.focusKey,
                      });
                      return extraGlobalProps === undefined
                        ? {}
                        : { extraGlobalProps };
                    })()}
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

export { ChoreographyView };
