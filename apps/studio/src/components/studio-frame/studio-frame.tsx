import type { ReactNode } from 'react';

import { Container } from '@/components/container';
import { cn } from '@/utils';

type StudioFrameProps = {
  children?: ReactNode;
  className?: string;
};

function StudioFrame({ children, className }: StudioFrameProps) {
  return (
    <Container className='min-h-[240px] min-w-[240px] bg-[#f5f5f5] box-border overflow-hidden pointer-events-none'>
      <Container
        className={cn('py-10 px-4 gap-4 pointer-events-none', className)}
      >
        {children}
      </Container>
    </Container>
  );
}

export { StudioFrame };
