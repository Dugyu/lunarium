// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { AnimatePresence } from 'motion/react';
import type { MotionNodeLayoutOptions, MotionNodeOptions } from 'motion/react';
import * as motion from 'motion/react-client';
import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/utils';

type MotionPresentationProps =
  & Omit<MotionNodeOptions, keyof MotionNodeLayoutOptions>
  & ComponentPropsWithoutRef<'div'>;

function MotionPresentation(props: MotionPresentationProps) {
  const { children, className, ...restProps } = props;

  return (
    <AnimatePresence propagate>
      <motion.div
        layout={false}
        className={cn(
          'relative w-[4px] h-[4px] flex justify-center items-center overflow-visible origin-center',
          className,
        )}
        {...restProps}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export { MotionPresentation };
