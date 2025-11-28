import { useMemo } from '@lynx-js/react';
import type { ReactNode } from '@lynx-js/react';

import { LunaThemeContext } from './theme-context.js';
import type {
  LunaCustomThemeKey,
  LunaRuntimeTheme,
  LunaThemeContextValue,
  LunaThemeFallbackStrategy,
  LunaThemeMode,
  LunaThemeProviderProps,
  LunaThemeVariant,
  NonEmptyArray,
} from './types.js';

export function LunaThemeProvider({
  themes,
  themeKey,
  fallbackStrategy = 'mode-first',
  children,
}: LunaThemeProviderProps): ReactNode {
  const value = useMemo<LunaThemeContextValue>(() => {
    const theme = resolveTheme(themes, themeKey, fallbackStrategy);
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

/**
 * Ensure themes is non-empty at runtime.
 */
function toNonEmptyThemes(
  themes: LunaRuntimeTheme[],
): NonEmptyArray<LunaRuntimeTheme> {
  if (themes.length === 0) {
    throw new Error('LunaThemeProvider requires at least one theme.');
  }
  return themes as NonEmptyArray<LunaRuntimeTheme>;
}

/**
 * Resolve the active runtime theme based on requested key and strategy.
 */
function resolveTheme(
  themes: LunaRuntimeTheme[],
  requestedKey: LunaCustomThemeKey | undefined,
  strategy: LunaThemeFallbackStrategy,
): LunaRuntimeTheme {
  const nonEmpty = toNonEmptyThemes(themes);
  const effectiveKey = pickThemeKey(nonEmpty, requestedKey, strategy);
  // We know this must exist because pickThemeKey only returns keys from themes
  const theme = nonEmpty.find(t => t.key === effectiveKey)!;
  return theme;
}

/**
 * Pick an effective theme key based on:
 *   1) exact match
 *   2) strategy-controlled fallback (variant-first or mode-first)
 *   3) default fallback (official Luna themes, then first theme)
 */
function pickThemeKey(
  themes: NonEmptyArray<LunaRuntimeTheme>,
  requestedKey: LunaCustomThemeKey | undefined,
  strategy: LunaThemeFallbackStrategy,
): LunaCustomThemeKey {
  // 1. Exact match.
  if (requestedKey) {
    const exact = themes.find(t => t.key === requestedKey);
    if (exact) return exact.key;
  }

  const requestedVariant = inferKnownVariantFromKey(requestedKey);
  const requestedMode = inferKnownModeFromKey(requestedKey);

  const trySameVariant = (): LunaCustomThemeKey | undefined => {
    if (!requestedVariant) return undefined;
    const sameVariant = themes.find(t => t.variant === requestedVariant);
    return sameVariant?.key;
  };

  const trySameMode = (): LunaCustomThemeKey | undefined => {
    if (!requestedMode) return undefined;
    const sameMode = themes.find(t => t.mode === requestedMode);
    return sameMode?.key;
  };

  // 2. Strategy-controlled fallback.
  let byStrategy: LunaCustomThemeKey | undefined;

  if (strategy === 'mode-first') {
    byStrategy = trySameMode() ?? trySameVariant();
  } else {
    // "variant-first"
    byStrategy = trySameVariant() ?? trySameMode();
  }

  if (byStrategy) return byStrategy;

  // 3. Default fallback:
  //    prefer official "luna-light" -> any "luna" -> any "lunaris" -> first theme.
  const preferred = themes.find(t => t.key === 'luna-light')
    ?? themes.find(t => t.variant === 'luna')
    ?? themes.find(t => t.variant === 'lunaris')
    ?? themes[0];

  return preferred.key;
}

/**
 * Infer known variant from key if possible.
 * Examples:
 *   "luna-light"    -> "luna"
 *   "lunaris-dark"  -> "lunaris"
 *   "cosmic-night"  -> undefined
 */
function inferKnownVariantFromKey(
  key?: LunaCustomThemeKey,
): LunaThemeVariant | undefined {
  if (!key) return undefined;
  if (key.startsWith('luna-')) return 'luna';
  if (key.startsWith('lunaris-')) return 'lunaris';
  return undefined;
}

/**
 * Infer known mode from key if possible.
 * Examples:
 *   "luna-light"          -> "light"
 *   "cosmic-night-dark"   -> "dark"
 *   "cosmic-night"        -> undefined
 */
function inferKnownModeFromKey(
  key?: LunaCustomThemeKey,
): LunaThemeMode | undefined {
  if (!key) return undefined;
  if (key.endsWith('-light')) return 'light';
  if (key.endsWith('-dark')) return 'dark';
  return undefined;
}
