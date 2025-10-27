import { AnimatePresence } from 'motion/react';
import type { SpringOptions, Transition } from 'motion/react';
import { useMemo, useState } from 'react';

import { LunaLynxStage } from '@/components/lynx-stage';
import {
  MotionContainer,
  MotionMockup,
  MotionPresentation,
} from '@/components/mockup-motion';
import type { LynxUIComponentName } from '@/types';
import { cn } from '@/utils';

type ViewMode = 'compare' | 'focus' | 'lineup';

type DynamicViewProps = {
  mode?: ViewMode;
};

type Stage = {
  entry: string;
  theme: 'luna-light' | 'luna-dark';
  componentName?: LynxUIComponentName;
};

const STAGES: Record<string, Stage> = {
  A1L: { entry: 'ActBloom', theme: 'luna-light', componentName: 'Sheet' },
  A1D: { entry: 'ActOneDark', theme: 'luna-dark' },
  A2L: { entry: 'ActMoonrise', theme: 'luna-light', componentName: 'Button' },
  A2D: { entry: 'ActMoonrise', theme: 'luna-dark' },
  Switch: { entry: 'ActSwitch', theme: 'luna-light', componentName: 'Switch' },
  Slider: { entry: 'ActTwoDark', theme: 'luna-dark', componentName: 'Slider' },
  Radio: {
    entry: 'ActTwoLight',
    theme: 'luna-light',
    componentName: 'Radio Group',
  },
  Toast: { entry: 'ActOneDark', theme: 'luna-dark', componentName: 'Toast' },
  Popover: {
    entry: 'ActOneLight',
    theme: 'luna-light',
    componentName: 'Popover',
  },
  Dialog: { entry: 'ActOneDark', theme: 'luna-dark', componentName: 'Dialog' },
  Checkbox: {
    entry: 'ActTwoLight',
    theme: 'luna-light',
    componentName: 'Checkbox',
  },
  Input: { entry: 'ActTwoDark', theme: 'luna-dark', componentName: 'Input' },
};

type Spec = {
  id: string;
  className: string;
};

type RenderData = Spec & Stage;

const BASE_STATUS: Record<ViewMode, Spec[]> = {
  compare: [
    { id: 'A1D', 'className': 'flex-1 order-2' },
    { id: 'A2D', 'className': 'flex-1 order-4' },
    { id: 'A1L', 'className': 'flex-1 order-1' },
    { id: 'A2L', 'className': 'flex-1 order-3' },
  ],
  focus: [
    {
      id: 'Switch',
      'className': 'col-start-2 col-end-3 row-start-1 row-end-2',
    },
    {
      id: 'Slider',
      'className': 'col-start-2 col-end-3 row-start-1 row-end-2',
    },
    {
      id: 'Radio',
      'className': 'col-start-2 col-end-3 row-start-1 row-end-2',
    },
    { id: 'Toast', 'className': 'col-start-2 col-end-3 row-start-1 row-end-2' },
    {
      id: 'Popover',
      'className': 'col-start-2 col-end-3 row-start-1 row-end-2',
    },
    {
      id: 'Dialog',
      'className': 'col-start-2 col-end-3 row-start-1 row-end-2',
    },
    { id: 'A1L', 'className': 'col-start-1 col-end-2 row-start-1 row-end-2' },
    { id: 'A2L', 'className': 'col-start-2 col-end-3 row-start-1 row-end-2' },
  ],
  lineup: [
    {
      id: 'Switch',
      'className': 'col-start-1 col-end-2 row-start-1 row-end-2',
    },
    {
      id: 'Slider',
      'className': 'col-start-2 col-end-3 row-start-1 row-end-2',
    },
    {
      id: 'Radio',
      'className': 'col-start-3 col-end-4 row-start-1 row-end-2',
    },
    { id: 'Toast', 'className': 'col-start-1 col-end-2 row-start-2 row-end-3' },

    {
      id: 'Popover',
      'className': 'col-start-3 col-end-4 row-start-2 row-end-3',
    },
    {
      id: 'Dialog',
      'className': 'col-start-4 col-end-5 row-start-2 row-end-3',
    },
    { id: 'A1L', 'className': 'col-start-4 col-end-5 row-start-1 row-end-2' }, // Sheet
    { id: 'A2L', 'className': 'col-start-2 col-end-3 row-start-2 row-end-3' }, // Button
  ],
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

const DEFAULT_FOCUSED: LynxUIComponentName = 'Button';

function DynamicView({ mode = 'compare' }: DynamicViewProps) {
  const [focused, setFocused] = useState<LynxUIComponentName>(DEFAULT_FOCUSED);

  const rendered: RenderData[] = useMemo(() => {
    const items = BASE_STATUS[mode].map(d => ({ ...d, ...STAGES[d.id] }));
    return items;
  }, [mode]);

  return (
    <div
      className={cn(
        'w-full h-full gap-4 pointer-events-none relative',
        mode === 'compare' && 'flex flex-row items-center justify-between',
        mode === 'focus' && 'grid grid-cols-2 grid-rows-1',
        mode === 'lineup' && 'grid grid-cols-4 grid-rows-2',
      )}
    >
      <AnimatePresence mode='popLayout'>
        {rendered.map(stage => {
          return (
            <MotionContainer
              layoutId={stage.id}
              key={stage.id}
              className={cn(
                'h-full',
                stage.className,
                (mode === 'focus' && stage.componentName
                  && focused === stage.componentName) && 'z-10',
              )}
            >
              <MotionPresentation
                key={stage.id}
                variants={slidingVariants}
                initial='initial'
                animate='animate'
                exit='exit'
                transition={presentationTransition}
              >
                <MotionMockup
                  fitProgress={mode === 'lineup' ? 0.5 : 0}
                  fitTransition={fitTransition}
                  className={stage.theme === 'luna-light'
                    ? 'bg-white opacity-50'
                    : 'bg-black opacity-10'}
                >
                  {/* <LynxStage entry={stage.entry} /> */}
                  <LunaLynxStage
                    entry={stage.entry}
                    lunaTheme={stage.theme}
                    studioViewMode={mode}
                    focusedComponent={focused}
                    onFocusedChange={setFocused}
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

export type { ViewMode };

export { DynamicView };
