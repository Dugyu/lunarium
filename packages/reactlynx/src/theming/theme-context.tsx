import { createContext } from '@lynx-js/react';
import type { Context } from '@lynx-js/react';

import type { LunaThemeContextValue } from './types.js';

const LunaThemeContext: Context<LunaThemeContextValue | null> = createContext<
  LunaThemeContextValue | null
>(null);

export { LunaThemeContext };
