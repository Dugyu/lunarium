import { useContext } from '@lynx-js/react';

import { LunaThemeContext } from './theme-context.js';
import type { LunaThemeContextValue } from './types.js';

/**
 * Internal hook.
 * Returns theme context or null if no provider is found.
 */
export function useLunaThemeContext(): LunaThemeContextValue | null {
  return useContext(LunaThemeContext);
}
