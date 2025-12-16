import type { ReactNode } from '@lynx-js/react';

import type {
  LunaColorId,
  LunaColorKey,
  // Custom
  LunaCustomThemeKey,
  LunaCustomThemeMeta,
  LunaCustomThemeMode,
  LunaCustomThemeTokens,
  LunaCustomThemeVariant,
  // Resolve
  LunaThemeFallbackStrategy,
  // Official
  LunaThemeKey,
  LunaThemeTokens,
} from '@dugyu/luna-core';

export type {
  LunaColorId,
  LunaColorKey,
  // Custom
  LunaCustomThemeKey,
  LunaCustomThemeMeta,
  LunaCustomThemeMode,
  LunaCustomThemeTokens,
  LunaCustomThemeVariant,
  LunaThemeFallbackStrategy,
  // Official
  LunaThemeKey,
  LunaThemeTokens,
};

/**
 * Runtime theme object consumed by LunaThemeProvider and hooks.
 */
export type LunaRuntimeTheme = {
  key: LunaCustomThemeKey;
  variant: LunaCustomThemeVariant;
  mode: LunaCustomThemeMode;
  colors: Record<LunaColorKey, string>;
};

export type LunaThemeContextValue = {
  themeKey: LunaCustomThemeKey;
  theme: LunaRuntimeTheme;
};

/**
 * Unified theme definition accepted by createLunaTheme.
 */
export type LunaThemeDefinition =
  | LunaThemeTokens
  | LunaCustomThemeTokens
  | LunaCustomThemeMeta;

export type LunaThemeProviderProps = {
  themes: LunaRuntimeTheme[];
  themeKey?: LunaCustomThemeKey;
  defaultTheme?: LunaCustomThemeKey;
  fallbackStrategy?: LunaThemeFallbackStrategy;
  children?: ReactNode;
};

export type UseLunaColorOptions = {
  /**
   * Decide what to return:
   * - "value":   raw color value from theme.colors (default)
   * - "var-name": CSS variable name, e.g. "--luna-neutral"
   * - "var-ref":  CSS variable reference, e.g. "var(--luna-neutral)"
   */
  as?: 'value' | 'var-name' | 'var-ref';
  /**
   * CSS variable prefix:
   * LunaColorId "neutral" -> `--${cssVarPrefix}-neutral`
   * default: "luna" => "--luna-neutral"
   */
  cssVarPrefix?: string;
};
