import type { ReactNode } from '@lynx-js/react';

import { cn } from '@/utils';
import { useLunaColor } from '@dugyu/luna-reactlynx/theme';

function ActButton() {
  const color = useLunaColor();
  return (
    <view
      className='w-full h-full flex flex-col justify-center items-center gap-[8px] px-[64px]'
      style={{ backgroundColor: color('canvas') }}
    >
      {/* Button Demo */}
      <Button>Let it bloom</Button>
      <Button variant='secondary'>
        Stay asleep
      </Button>
    </view>
  );
}

type ButtonProps = {
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
};

function Button(props: ButtonProps) {
  const color = useLunaColor();
  const { variant = 'primary', children, className } = props;
  return (
    <view
      className={cn(
        'flex flex-row justify-center items-center rounded-full h-[48px] w-full',
        className,
      )}
      style={{
        backgroundColor: variant === 'primary'
          ? color('primary')
          : color('neutral'),
      }}
    >
      <text
        className={'text-base font-semibold'}
        style={{
          color: variant === 'primary'
            ? color('onPrimary')
            : color('onNeutral'),
        }}
      >
        {children}
      </text>
    </view>
  );
}
export { ActButton };
