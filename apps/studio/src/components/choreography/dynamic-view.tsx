import { AnimatePresence } from 'motion/react';
import { useMemo } from 'react';

import { LynxStage } from '@/components/lynx-stage';
import { MotionContainer, MotionMockup } from '@/components/mockup-motion';
import { cn } from '@/utils';

type ViewMode = 'compare' | 'focus' | 'lineup';

type DynamicViewProps = {
  mode?: ViewMode;
};

type Stage = { entry: string; theme: 'light' | 'dark' };

const STAGES: Record<string, Stage> = {
  A1L: { entry: 'ActOneLight', theme: 'light' },
  A1D: { entry: 'ActOneDark', theme: 'dark' },
  A2L: { entry: 'ActTwoLight', theme: 'light' },
  A2D: { entry: 'ActTwoDark', theme: 'dark' },
  Switch: { entry: 'ActSwitch', theme: 'light' },
  Slider: { entry: 'ActOneDark', theme: 'dark' },
  Button: { entry: 'ActOneDark', theme: 'dark' },
  Radio: { entry: 'ActOneLight', theme: 'light' },
  Sheet: { entry: 'ActOneDark', theme: 'dark' },
  Toast: { entry: 'ActTwoDark', theme: 'dark' },
  Popover: { entry: 'ActTwoLight', theme: 'light' },
  Dialog: { entry: 'ActTwoDark', theme: 'dark' },
  Checkbox: { entry: 'ActTwoLight', theme: 'light' },
  Input: { entry: 'ActOneDark', theme: 'dark' },
};

type Spec = {
  id: string;
  className: string;
};

type RenderData = Spec & Stage;

const BASE_STATUS: Record<ViewMode, Spec[]> = {
  compare: [
    { id: 'A1L', 'className': 'flex-1 h-full' },
    { id: 'A1D', 'className': 'flex-1 h-full' },
    { id: 'A2L', 'className': 'flex-1 h-full' },
    { id: 'A2D', 'className': 'flex-1 h-full' },
  ],
  focus: [{ id: 'A1L', 'className': 'flex-1 h-full' }, {
    id: 'A2L',
    'className': 'flex-1 h-full',
  }],
  lineup: [
    { id: 'Switch', 'className': 'flex-1 h-full' },
    { id: 'Slider', 'className': 'flex-1 h-full' },
    { id: 'Radio', 'className': 'flex-1 h-full' },
    { id: 'A1L', 'className': 'flex-1 h-full' }, // Sheet
    { id: 'Toast', 'className': 'flex-1 h-full' },
    { id: 'A2L', 'className': 'flex-1 h-full' }, // Button
    { id: 'Popover', 'className': 'flex-1 h-full' },
    { id: 'Dialog', 'className': 'flex-1 h-full' },
  ],
};

function DynamicView({ mode = 'compare' }: DynamicViewProps) {
  const rendered: RenderData[] = useMemo(() => {
    const items = BASE_STATUS[mode].map(d => ({ ...d, ...STAGES[d.id] }));
    return items;
  }, [mode]);

  return (
    <div
      className={cn(
        'w-full h-full gap-4 pointer-events-none relative',
        mode === 'lineup' && 'grid grid-cols-4 grid-rows-2',
        (mode === 'compare' || mode === 'focus')
          && 'flex flex-row items-center justify-between',
      )}
    >
      <AnimatePresence mode='popLayout'>
        {rendered.map(stage => {
          return (
            <MotionContainer
              layoutId={stage.id}
              key={stage.id}
              className={stage.className}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <MotionMockup
                fitProgress={mode === 'lineup' ? 0.5 : 0}
                className={stage.theme === 'light'
                  ? 'bg-white opacity-50'
                  : 'bg-black opacity-10'}
              >
                <LynxStage entry={stage.entry} />
              </MotionMockup>
            </MotionContainer>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export type { ViewMode };

export { DynamicView };
