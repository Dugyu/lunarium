import type { ReactNode } from '@lynx-js/react';

import { cn } from '@/utils';

type ButtonProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  shape?: 'normal' | 'capsule';
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
};

function Button(props: ButtonProps) {
  const { size = 'md', variant = 'primary', children, className } = props;

  return (
    <view
      className={cn(
        'flex flex-row justify-center items-center rounded-full h-[48px] w-full',
        variant === 'secondary' ? 'bg-neutral-4' : 'bg-primary',
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
          variant === 'secondary'
            ? 'text-base-content'
            : 'text-primary-content',
        )}
      >
        {children}
      </text>
    </view>
  );
}
export { Button };
