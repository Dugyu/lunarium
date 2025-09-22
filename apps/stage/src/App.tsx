import type { ReactNode } from '@lynx-js/react';
import { clsx } from 'clsx';

import './App.css';

type AppThemeProps = {
  preset?: 'luna-dark' | 'luna-light';
  children?: ReactNode;
};

function AppTheme({ preset = 'luna-dark', children }: AppThemeProps) {
  return (
    <view
      className={clsx(
        'w-full h-full flex flex-col justify-center items-center bg-base',
        preset,
      )}
    >
      {children}
    </view>
  );
}

export { AppTheme };
