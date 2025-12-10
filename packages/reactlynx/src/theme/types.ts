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
  // Official
  LunaThemeKey,
  LunaThemeMode,
  LunaThemeTokens,
  LunaThemeVariant,
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
  // Official
  LunaThemeKey,
  LunaThemeMode,
  LunaThemeTokens,
  LunaThemeVariant,
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
  themeKey: LunaCustomThemeKey | undefined;
  themes: LunaRuntimeTheme[];
  fallbackStrategy?: LunaThemeFallbackStrategy;
  children?: ReactNode;
};

/**
 * Strategy for fallback when requested themeKey is missing.
 * - "variant-first": prefer same variant, then same mode
 * - "mode-first": prefer same mode, then same variant
 */
export type LunaThemeFallbackStrategy = 'variant-first' | 'mode-first';

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

export type NonEmptyArray<T> = [T, ...T[]];
