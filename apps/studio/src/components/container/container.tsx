import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/utils';

type ContainerProps = {
  column?: boolean;
  center?: boolean;
};

const Container = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<'div'> & ContainerProps
>(
  (props, ref) => {
    const { className, column, center = false, ...restProps } = props;

    return (
      <div
        ref={ref}
        className={cn(
          'w-full h-full flex',
          column ? 'flex-col' : 'flex-row',
          center && 'justify-center items-center',
          className,
        )}
        {...restProps}
      />
    );
  },
);

Container.displayName = 'Container';

export { Container };
