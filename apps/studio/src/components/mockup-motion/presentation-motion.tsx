import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import type { ReactNode } from 'react';

import { cn } from '@/utils';

function MotionPresentation({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <AnimatePresence propagate>
      <motion.div
        layout={false}
        className={cn(
          'relative w-[4px] h-[4px] flex justify-center items-center overflow-visible',
          className,
        )}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        style={{ transformOrigin: '50% 50%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export { MotionPresentation };
