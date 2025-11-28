import type { ReactNode } from '@lynx-js/react';

import '@dugyu/luna-styles/index.css';
import './App.css';

import {
  lunaThemeResolver,
  lunarisThemeResolver,
  themeResolver,
} from './resolve-theme.js';

type LunaThemeProps = {
  variant: 'luna' | 'lunaris' | 'all';
  children?: ReactNode;
};

function LunaTheme({ variant, children }: LunaThemeProps) {
  const resolve = variant === 'luna'
    ? lunaThemeResolver
    : (variant === 'lunaris' ? lunarisThemeResolver : themeResolver);

  return (
    <page
      className={resolve()}
    >
      {children}
    </page>
  );
}

export { LunaTheme };
