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
        'flex flex-row justify-center items-center rounded-full h-[48px] w-full active:opacity-50 transition-all',
        variant === 'neutral'
          ? 'bg-neutral'
          : (variant === 'secondary' ? 'bg-neutral-ambient' : 'bg-primary'),
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
              ? 'text-content'
              : 'text-primary-content'),
        )}
      >
        {children}
      </text>
    </view>
  );
}
export { Button };
