// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { AnimatePresence } from 'motion/react';
import type {
  MotionNodeLayoutOptions,
  MotionNodeOptions,
  MotionStyle,
} from 'motion/react';
import * as motion from 'motion/react-client';
import type { ComponentPropsWithoutRef, JSX } from 'react';

const PRESENTATION_LOCKED_STYLE: MotionStyle = {
  position: 'relative',
  width: 4,
  height: 4,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'visible',
  transformOrigin: 'center',
};

type MotionPresentationProps =
  & Omit<MotionNodeOptions, keyof MotionNodeLayoutOptions>
  & ComponentPropsWithoutRef<'div'>;

function MotionPresentation(props: MotionPresentationProps): JSX.Element {
  const { children, className, style, ...restProps } = props;

  const mergedStyle: MotionStyle = style === undefined
    ? PRESENTATION_LOCKED_STYLE
    : { ...(style as MotionStyle), ...PRESENTATION_LOCKED_STYLE };

  return (
    <AnimatePresence propagate>
      <motion.div
        layout={false}
        className={className}
        style={mergedStyle}
        {...restProps}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export { MotionPresentation };
