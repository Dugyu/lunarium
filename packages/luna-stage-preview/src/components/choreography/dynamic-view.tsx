// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { AnimatePresence } from 'motion/react';
import type { SpringOptions, Transition } from 'motion/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { JSX } from 'react';

import type { StudioViewMode } from '@dugyu/luna-catalog';
import type { LunaThemeMode, LunaThemeVariant } from '@dugyu/luna-core';

import type { StageMeta, ViewSpec } from './types.js';
import { BASE_STATUS, STAGES } from '../../data/default-stages.js';
import type { MoonriseEvent } from '../../types/stage.js';
import { cn } from '../../utils/index.js';
import { LunaLynxStage } from '../lynx-stage/index.js';
import {
  MotionContainer,
  MotionMockup,
  MotionPresentation,
} from '../mockup-motion/index.js';

type WorldPos = {
  x: number;
  y: number;
  z: number;
};

type RenderData = ViewSpec & StageMeta & {
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
const DEFAULT_LUNA_THEME_VARIANT: LunaThemeVariant = 'lunaris';
const DEFAULT_LUNA_THEME_MODE: LunaThemeMode = 'dark';

const WORLD_ORIGIN: WorldPos = { x: 0, y: 0, z: 0 };

type DynamicViewProps = {
  mode?: StudioViewMode;
  className?: string;
  onThemeModeChange?: (mode: 'light' | 'dark') => void;
  /**
   * Override the default stage configurations.
   * Keys are stage IDs referenced by `layouts`.
   */
  stages?: Record<string, StageMeta>;
  /**
   * Override the default layout grid configs per view mode.
   */
  layouts?: Record<StudioViewMode, ViewSpec[]>;
  /**
   * Base URL for Lynx bundle files.
   * @default '/'
   */
  bundleBaseUrl?: string;
};

function DynamicView(
  {
    mode = 'compare',
    className,
    onThemeModeChange,
    stages: stagesProp,
    layouts: layoutsProp,
    bundleBaseUrl,
  }: DynamicViewProps,
): JSX.Element {
  const stages = stagesProp ?? STAGES;
  const layouts = layoutsProp ?? BASE_STATUS;

  const [focused, setFocused] = useState<string>(DEFAULT_FOCUSED);
  const [themeVariant, setThemeVariant] = useState<LunaThemeVariant>(
    DEFAULT_LUNA_THEME_VARIANT,
  );
  const [themeMode, setThemeMode] = useState<LunaThemeMode>(
    DEFAULT_LUNA_THEME_MODE,
  );

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      // ----- Variant Control -----
      if (e.key === 'a' || e.key === 'A') {
        setThemeVariant('luna');
      }
      if (e.key === 's' || e.key === 'S') {
        setThemeVariant('lunaris');
      }

      // ----- Mode Control -----
      if (e.key === 'j' || e.key === 'J') {
        setThemeMode('light');
        onThemeModeChange?.('light');
      }
      if (e.key === 'k' || e.key === 'K') {
        setThemeMode('dark');
        onThemeModeChange?.('dark');
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onThemeModeChange]);

  const handleMoonriseChange = useCallback((event: MoonriseEvent) => {
    if (event.field === 'luna-variant') {
      setThemeVariant(event.value);
    } else if (event.field === 'light-mode') {
      const next: 'light' | 'dark' = event.value === true ? 'light' : 'dark';
      setThemeMode(next);
      onThemeModeChange?.(next);
    }
  }, [onThemeModeChange]);

  const rendered: RenderData[] = useMemo(() => {
    const components = layouts[mode].map(d => stages[d.id])
      .filter(d => d?.componentId);
    const backgroundComponents = components.filter(d =>
      d?.componentId !== focused
    );

    const mid = (backgroundComponents.length - 1) / 2;

    const focusedIndex = components.findIndex(d => d?.componentId === focused);

    const items = layouts[mode].map((d) => {
      const stageMeta = stages[d.id];
      if (!stageMeta) return null;

      const compOrder = backgroundComponents.findIndex(s =>
        s?.componentId === stageMeta.componentId
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
            : Math.cos(theta) * 600,
        }
        : WORLD_ORIGIN;

      const zIndex = mode === 'focus'
        ? (escape ? 100 : Math.ceil(Math.abs(compOrder - mid) * 2))
        : 0;

      const maskOpacity = mode === 'focus'
        ? (escape ? 0 : 1 - Math.abs(theta * 2 / Math.PI) * 0.6)
        : 0;

      const data: RenderData = {
        ...d,
        ...stageMeta,
        world,
        zIndex: zIndex,
        maskOpacity: maskOpacity * 0.5,
      };
      return data;
    }).filter((item): item is RenderData => item !== null);

    return items;
  }, [mode, focused, stages, layouts]);

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
            <MotionContainer
              layoutId={stage.id}
              key={stage.id}
              className={cn(
                'h-full',
                stage.className,
              )}
              style={{
                zIndex: stage.zIndex,
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
                <MotionMockup
                  fitProgress={0}
                  fitTransition={fitTransition}
                  world={stage.world}
                  focalLength={mode === 'focus' ? 500 : 0}
                  className={themeMode === 'light'
                    ? 'bg-black opacity-[0.04]'
                    : 'bg-white opacity-5'}
                  maskColor={themeMode === 'light' ? '#f5f5f5' : '#0000000'}
                  maskOpacity={themeMode === 'light'
                    ? stage.maskOpacity
                    : stage.maskOpacity * 0.2}
                >
                  <LunaLynxStage
                    entry={stage.entry}
                    lunaTheme={mode === 'compare'
                      ? stage.theme
                      : `${themeVariant}-${themeMode}`}
                    lunaThemeVariant={themeVariant}
                    studioViewMode={mode}
                    focusedComponent={focused}
                    onFocusedChange={setFocused}
                    onMoonriseChange={handleMoonriseChange}
                    {...(stage.componentId !== undefined
                      && { componentEntry: stage.componentId })}
                    {...(bundleBaseUrl !== undefined && { bundleBaseUrl })}
                  />
                </MotionMockup>
              </MotionPresentation>
            </MotionContainer>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export type { DynamicViewProps };

export { DynamicView };
