import type { MotionValue } from 'motion/react';
import { useMemo } from 'react';
import type { ReactNode } from 'react';

import { VisualSizeContext } from './visual-size-context.tsx';
import type { VisualSizeValue } from './visual-size-context.tsx';

type VisualSizeProviderProps = {
  visualW: MotionValue<number>;
  visualH: MotionValue<number>;
  children?: ReactNode;
};
export function VisualSizeProvider({
  visualW,
  visualH,
  children,
}: VisualSizeProviderProps) {
  const value: VisualSizeValue = useMemo(
    () => ({ visualW, visualH }),
    [visualW, visualH],
  );
  return (
    <VisualSizeContext.Provider value={value}>
      {children}
    </VisualSizeContext.Provider>
  );
}
