// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import type { ComponentPropsWithRef } from 'react';

import { Container } from '@/components/container';
import { RECORD_MODE } from '@/constants/presentation';
import { cn } from '@/utils';

type StudioFrameProps = ComponentPropsWithRef<'div'>;

function StudioFrame({ children, className, ...restProps }: StudioFrameProps) {
  return (
    <Container
      className={cn(
        'min-h-[240px] min-w-[240px] bg-[#f5f5f5] box-border overflow-hidden pointer-events-none px-4 md:px-10',
        RECORD_MODE ? 'py-24' : 'py-10',
        className,
      )}
      {...restProps}
    >
      {children}
    </Container>
  );
}

export { StudioFrame };
