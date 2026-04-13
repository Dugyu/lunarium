// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import type { ComponentPropsWithRef, JSX } from 'react';

import { cn } from '../../utils/index.js';
import { Container } from '../container/index.js';

type StudioFrameProps = ComponentPropsWithRef<'div'> & {
  /**
   * When true, adds extra vertical padding for screen recording layouts.
   * @default false
   */
  recordMode?: boolean;
};

function StudioFrame(
  { children, className, recordMode = false, ...restProps }: StudioFrameProps,
): JSX.Element {
  return (
    <Container
      className={cn(
        'min-h-[240px] min-w-[240px] bg-[#f5f5f5] box-border overflow-hidden pointer-events-none px-4 md:px-10',
        recordMode ? 'py-24' : 'py-10',
        className,
      )}
      {...restProps}
    >
      {children}
    </Container>
  );
}

export { StudioFrame };
export type { StudioFrameProps };
