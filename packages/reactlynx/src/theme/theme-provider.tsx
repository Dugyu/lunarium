import { useMemo } from '@lynx-js/react';
import type { ReactNode } from '@lynx-js/react';

import { resolveThemeObjectFromList } from '@dugyu/luna-core';

import { LunaThemeContext } from './theme-context.js';
import type { LunaThemeContextValue, LunaThemeProviderProps } from './types.js';

export function LunaThemeProvider({
  themes,
  themeKey,
  fallbackStrategy = 'mode-first',
  children,
}: LunaThemeProviderProps): ReactNode {
  const value = useMemo<LunaThemeContextValue>(() => {
    const theme = resolveThemeObjectFromList(
      themes,
      themeKey,
      { strategy: fallbackStrategy, onEmpty: 'throw' },
    )!;
    return {
      themeKey: theme.key,
      theme,
    };
  }, [themeKey, themes, fallbackStrategy]);

  return (
    <LunaThemeContext.Provider value={value}>
      {children}
    </LunaThemeContext.Provider>
  );
}
