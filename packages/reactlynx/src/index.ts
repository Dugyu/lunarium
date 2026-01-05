export {
  LunaThemeContext,
  LunaThemeProvider,
  createLunaTheme,
  useLunaThemeContext,
  useLunaColor,
  useLunaColors,
} from './theming/index.js';

// Types (ReactLynx surface)
export type {
  CreateLunaThemeOptions,
  LunaRuntimeTheme,
  LunaThemeContextValue,
  LunaThemeInput,
  LunaThemeProviderProps,
  LunaThemeProviderSingleThemeProps,
  LunaThemeProviderThemeListProps,
  LunaRuntimeThemeSourceType,
  LunaRuntimeThemeConsumptionFormat,
  LunaConsumptionOptions,
  UseLunaColorOptions,
  UseLunaColorsOptions,
} from './theming/types.js';

// Types (re-export from luna-core for convenience)
export type {
  LunaColorId,
  LunaColorKey,
  LunaCustomThemeKey,
  LunaCustomThemeMeta,
  LunaCustomThemeMode,
  LunaCustomThemeTokens,
  LunaCustomThemeVariant,
  LunaThemeKey,
  LunaThemeTokens,
  LunaThemeResolverOptions,
} from '@dugyu/luna-core';
