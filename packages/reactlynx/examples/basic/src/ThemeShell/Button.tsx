import type { ReactNode } from '@lynx-js/react';
import { clsx } from 'clsx';

type ButtonProps = {
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
};

function Button(props: ButtonProps) {
  const { variant = 'primary', disabled = false, children, className = '' } =
    props;

  return (
    <view
      className={clsx(
        'luna-pill',
        disabled && 'luna-pill--disabled',
        variant === 'primary' ? 'luna-pill--primary' : 'luna-pill--neutral',
        className,
      )}
    >
      <text
        className={clsx(
          'luna-text',
          variant === 'primary' ? 'luna-text--primary' : 'luna-text--neutral',
          className,
        )}
      >
        {children}
      </text>
    </view>
  );
}
export { Button };
