import type { MotionValue } from 'motion/react';
import { createContext } from 'react';

type VisualSizeValue = {
  visualW: MotionValue<number>;
  visualH: MotionValue<number>;
};

const VisualSizeContext = createContext<VisualSizeValue | null>(null);

export { VisualSizeContext };
export type { VisualSizeValue };
