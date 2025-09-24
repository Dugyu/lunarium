import { clsx } from 'clsx';
import type { ComponentPropsWithRef } from 'react';

function Frame(
  { children, className, ...restProps }: ComponentPropsWithRef<'div'>,
) {
  return (
    <div
      className={clsx(
        'w-full h-full min-h-[240px] min-w-[240px] bg-[#f5f5f5] flex flex-row justify-center items-center box-border',
        className,
      )}
      {...restProps}
    >
      {children}
    </div>
  );
}

export { Frame };
