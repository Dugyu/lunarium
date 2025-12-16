import { useContext } from '@lynx-js/react';

import { LunaThemeContext } from './theme-context.js';
import type { LunaThemeContextValue } from './types.js';

export function useLunaTheme(): LunaThemeContextValue {
  const ctx = useContext(LunaThemeContext);

  if (!ctx) {
    throw new Error('useLunaTheme must be used within a LunaThemeProvider.');
  }

  return ctx;
}
