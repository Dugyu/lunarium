import type { ReactNode } from '@lynx-js/react';
import { clsx } from 'clsx';

import type { LunaNeutralThemeKey } from '@/types';

import './App.css';

type AppThemeProps = {
  preset?: LunaNeutralThemeKey;
  children?: ReactNode;
};

function AppTheme({ preset = 'luna-dark', children }: AppThemeProps) {
  return (
    <page
      className={clsx(
        'flex flex-col justify-center items-center bg-base-1',
        preset,
      )}
    >
      {children}
    </page>
  );
}

export { AppTheme };
