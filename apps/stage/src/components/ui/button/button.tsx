import type { ReactNode } from '@lynx-js/react';

import { cn } from '@/utils';

type ButtonProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'neutral' | 'primary' | 'secondary' | 'outline' | 'ghost';
  shape?: 'normal' | 'capsule';
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
};

function Button(props: ButtonProps) {
  const { size = 'md', variant = 'neutral', children, className } = props;

  return (
    <view
      className={cn(
        'flex flex-row justify-center items-center rounded-full h-[48px] w-full',
        variant === 'neutral'
          ? 'bg-neutral-1'
          : (variant === 'secondary' ? 'bg-neutral-subtle' : 'bg-primary-1'),
        size
            === 'lg'
          ? 'h-[48px]'
          : 'h-[32px]',
        className,
      )}
    >
      <text
        className={cn(
          'text-base font-semibold',
          variant === 'neutral'
            ? 'text-neutral-content'
            : (variant === 'secondary'
              ? 'text-content-1'
              : 'text-primary-content'),
        )}
      >
        {children}
      </text>
    </view>
  );
}
export { Button };
