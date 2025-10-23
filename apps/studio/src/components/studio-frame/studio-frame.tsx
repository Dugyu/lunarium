import type { ComponentPropsWithRef } from 'react';

import { Container } from '@/components/container';
import { cn } from '@/utils';

type StudioFrameProps = ComponentPropsWithRef<'div'>;

function StudioFrame({ children, className, ...restProps }: StudioFrameProps) {
  return (
    <Container
      className={cn(
        'min-h-[240px] min-w-[240px] bg-[#f5f5f5] box-border overflow-hidden pointer-events-none px-4 py-10 md:px-10',
        className,
      )}
      {...restProps}
    >
      {children}
    </Container>
  );
}

export { StudioFrame };
