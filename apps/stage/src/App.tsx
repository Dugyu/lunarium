import type { ReactNode } from '@lynx-js/react';
import { clsx } from 'clsx';

import type { LunaThemeKey } from '@/types';

import './App.css';

type AppThemeProps = {
  preset?: LunaThemeKey;
  children?: ReactNode;
};

function AppTheme({ preset = 'luna-dark', children }: AppThemeProps) {
  return (
    <page
      className={clsx(
        'flex flex-col justify-center items-center bg-canvas text-content transition-colors duration-300 ease-in-out',
        preset,
      )}
    >
      {children}
    </page>
  );
}

export { AppTheme };
