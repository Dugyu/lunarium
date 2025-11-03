import { AnimatePresence } from 'motion/react';
import type { SpringOptions, Transition } from 'motion/react';
import { useCallback, useMemo, useState } from 'react';

import { LunaLynxStage } from '@/components/lynx-stage';
import {
  MotionContainer,
  MotionMockup,
  MotionPresentation,
} from '@/components/mockup-motion';
import type {
  LunaThemeVariant,
  LynxUIComponentId,
  MoonriseEvent,
  StudioViewMode,
} from '@/types';
import { cn } from '@/utils';

import { BASE_STATUS, STAGES } from './data.ts';
import type { StageMeta, ViewSpec } from './types.ts';

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

const DEFAULT_FOCUSED: LynxUIComponentId = 'button';
const DEFAULT_LUNA_THEME_VARIANT: LunaThemeVariant = 'luna';

const WORLD_ORIGIN: WorldPos = { x: 0, y: 0, z: 0 };

type DynamicViewProps = {
  mode?: StudioViewMode;
  className?: string;
};

function DynamicView({ mode = 'compare', className }: DynamicViewProps) {
  const [focused, setFocused] = useState<LynxUIComponentId>(DEFAULT_FOCUSED);
  const [themeVariant, setThemeVariant] = useState<LunaThemeVariant>(
    DEFAULT_LUNA_THEME_VARIANT,
  );

  const handleMoonriseChange = useCallback((event: MoonriseEvent) => {
    if (event.field === 'luna-variant') {
      setThemeVariant(event.value);
    }
  }, []);

  const rendered: RenderData[] = useMemo(() => {
    const components = BASE_STATUS[mode].map(d => STAGES[d.id])
      .filter(d => d.componentId);
    const backgroundComponents = components.filter(d =>
      d.componentId !== focused
    );

    const mid = (backgroundComponents.length - 1) / 2;

    const focusedIndex = components.findIndex(d => d.componentId === focused);

    const items = BASE_STATUS[mode].map((d) => {
      const stageMeta = STAGES[d.id];
      const compOrder = backgroundComponents.findIndex(d =>
        d.componentId === stageMeta.componentId
      );
      const escape = compOrder === -1;

      const direction = (compOrder - mid) > 0 ? 1 : -1;

      const theta = ((compOrder - mid) * 22 + direction * focusedIndex * 2)
        / 180 * Math.PI;

      const world: WorldPos = mode === 'focus'
        ? {
          x: escape
            ? 0
            : Math.sin(theta) * 600,
          y: 0,
          z: escape
            ? 0
            : Math.cos(theta) * 600, // (1.5 - Math.abs((mid - compOrder) / mid)) * 500,
        }
        : WORLD_ORIGIN;

      const zIndex = mode === 'focus'
        ? (escape ? 100 : Math.ceil(Math.abs(compOrder - mid) * 2))
        : 0;

      const maskOpacity = mode === 'focus'
        ? (escape ? 0 : 1 - Math.abs(theta * 2 / Math.PI) * 0.6)
        : 0;

      const data = { ...d, ...stageMeta, world, zIndex: zIndex, maskOpacity };
      return data;
    });
    return items;
  }, [mode, focused]);

  return (
    <div
      className={cn(
        'size-full gap-4 pointer-events-none relative',
        mode === 'compare' && 'flex flex-row items-center justify-between',
        mode === 'focus' && 'grid grid-cols-3 grid-rows-1',
        mode === 'lineup' && 'grid grid-cols-4 grid-rows-2',
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
                  fitProgress={mode === 'lineup' ? 0.5 : 0}
                  fitTransition={fitTransition}
                  world={stage.world}
                  focalLength={mode === 'focus' ? 500 : 0}
                  className={stage.theme === 'luna-light'
                    ? 'bg-white opacity-50'
                    : 'bg-black opacity-10'}
                  maskColor='#f5f5f5'
                  maskOpacity={stage.maskOpacity}
                >
                  <LunaLynxStage
                    entry={stage.entry}
                    lunaTheme={stage.theme}
                    lunaThemeVariant={themeVariant}
                    studioViewMode={mode}
                    focusedComponent={focused}
                    onFocusedChange={setFocused}
                    onMoonriseChange={handleMoonriseChange}
                    componentEntry={stage.componentId}
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
