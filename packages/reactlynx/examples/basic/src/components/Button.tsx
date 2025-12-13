import type { ReactNode } from '@lynx-js/react';

import { useLunaColor } from '@dugyu/luna-reactlynx';

type ButtonProps = {
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
};

function Button(props: ButtonProps) {
  const color = useLunaColor();
  const { variant = 'primary', disabled = false, children, className = '' } =
    props;

  return (
    <view
      style={{
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: '9999px',
        opacity: disabled ? 0.5 : 1,
        height: '48px',
        width: '100%',
        backgroundColor: variant === 'primary'
          ? color('primary')
          : color('neutral'),
      }}
      className={className}
    >
      <text
        className={'text-base font-semibold'}
        style={{
          color: variant === 'primary'
            ? color('primaryContent')
            : color('neutralContent'),
        }}
      >
        {children}
      </text>
    </view>
  );
}
export { Button };
