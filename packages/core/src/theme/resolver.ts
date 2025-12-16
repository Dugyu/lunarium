import type {
  LunaCustomThemeKey,
  LunaCustomThemeVariant,
  LunaThemeMode,
} from './keys.js';

const DARK_MODE_RE = /(?:^|-)dark(?:-|$)/i;
const LIGHT_MODE_RE = /(?:^|-)light(?:-|$)/i;

export type NonEmptyArray<T> = [T, ...T[]];

/**
 * Fallback strategy used when the requested theme key is not an exact match.
 *
 * Fallback candidates are always selected in the order of the provided themes;
 * the resolver never reorders the list.
 *
 * - 'none': exact match only, no fallback.
 * - 'mode-only': fallback by mode (light/dark) only.
 * - 'variant-only': fallback by variant only.
 * - 'mode-first': fallback by mode, then variant.
 * - 'variant-first': fallback by variant, then mode.
 */
export type LunaThemeFallbackStrategy =
  | 'none'
  | 'mode-only'
  | 'variant-only'
  | 'mode-first'
  | 'variant-first';

/**
 * Behavior when no matching theme can be resolved.
 *
 * - 'default': fallback to the default theme.
 * - 'first': fallback to the first provided theme.
 * - 'throw': throw an error.
 */
export type LunaThemeOnMissing = 'default' | 'first' | 'throw';

/**
 * Options controlling theme resolution behavior.
 */
export type LunaThemeResolverOptions = {
  /**
   * Preferred default theme key.
   * Used when no exact or fallback match is found.
   *
   * @defaultValue 'luna-dark'
   */
  defaultTheme?: LunaCustomThemeKey;

  /**
   * Fallback strategy when the requested theme key
   * is not an exact match.
   *
   * @defaultValue 'variant-first'
   */
  strategy?: LunaThemeFallbackStrategy;

  /**
   * Behavior when no matching theme can be resolved.
   *
   * @defaultValue 'default'
   */
  onMissing?: LunaThemeOnMissing;
};

/**
 * Infer known theme mode from key if possible.
 * Examples:
 *   "luna-light"          -> "light"
 *   "cosmic-night-dark"   -> "dark"
 *   "cosmic-night"        -> undefined
 */
export function inferThemeMode(
  key?: LunaCustomThemeKey,
): LunaThemeMode | undefined {
  if (!key) return undefined;
  if (DARK_MODE_RE.test(key)) return 'dark';
  if (LIGHT_MODE_RE.test(key)) return 'light';
  return undefined;
}

/**
 * Infer known variant from key if possible.
 * Examples:
 *   "luna-light"    -> "luna"
 *   "lunaris-dark"  -> "lunaris"
 *   "cosmic-night"  -> undefined
 */
export function inferThemeVariant(
  key?: LunaCustomThemeKey,
): LunaCustomThemeVariant | undefined {
  if (!key) return undefined;
  if (key.startsWith('luna-')) return 'luna';
  if (key.startsWith('lunaris-')) return 'lunaris';
  const lower = key.toLowerCase();
  const segments = lower.split('-');
  return segments[0];
}

/**
 * Resolve a theme key from an allowed non-empty list of keys.
 *
 * The first matching candidate is selected according to the provided order.
 */
export function resolveTheme(
  allowed: NonEmptyArray<LunaCustomThemeKey>,
  requested: LunaCustomThemeKey | undefined,
  options: LunaThemeResolverOptions,
): LunaCustomThemeKey {
  options = options ?? {};
  const defaultTheme = options.defaultTheme
    ?? ('luna-dark' as LunaCustomThemeKey);
  const strategy = options.strategy ?? 'variant-first';
  const onMissing = options.onMissing ?? 'default';

  const runtimeDefaultTheme = allowed.includes(defaultTheme)
    ? defaultTheme
    : allowed[0];

  // 1. Exact match
  if (requested && allowed.includes(requested)) return requested;

  // 2. Strategy-controlled fallback.

  const requestedMode = inferThemeMode(requested);
  const requestedVariant = inferThemeVariant(requested);

  const trySameMode = (): LunaCustomThemeKey | undefined => {
    if (!requestedMode) return undefined;
    const sameMode = allowed.find(t => inferThemeMode(t) === requestedMode);
    return sameMode;
  };

  const trySameVariant = (): LunaCustomThemeKey | undefined => {
    if (!requestedVariant) return undefined;
    const sameVariant = allowed.find(t =>
      inferThemeVariant(t) === requestedVariant
    );
    return sameVariant;
  };

  const byStrategy = (() => {
    switch (strategy) {
      case 'mode-only':
        return trySameMode();
      case 'variant-only':
        return trySameVariant();
      case 'mode-first':
        return trySameMode() ?? trySameVariant();
      case 'variant-first':
        return trySameVariant() ?? trySameMode();
      case 'none':
      default:
        return undefined;
    }
  })();

  if (byStrategy) return byStrategy;
  // 3. Missing handling
  if (onMissing === 'throw') {
    throw new Error(
      `Theme "${
        requested ?? '(undefined)'
      }" is not allowed, and fallback is disabled.`,
    );
  }

  if (onMissing === 'first') return allowed[0];

  // 'default'
  return runtimeDefaultTheme;
}

/**
 * Resolve a theme key from an allowed list that MAY be empty.
 */
export function resolveThemeFromList(
  allowed: readonly LunaCustomThemeKey[],
  requested: LunaCustomThemeKey | undefined,
  options: LunaThemeResolverOptions & { onEmpty?: 'throw' | 'default' } = {},
): LunaCustomThemeKey {
  if (allowed.length === 0) {
    const defaultTheme = options.defaultTheme
      ?? ('luna-dark' as LunaCustomThemeKey);
    const onEmpty = options.onEmpty ?? 'default';
    if (onEmpty === 'throw') {
      throw new Error(
        'resolveThemeFromList requires a non-empty allowed list.',
      );
    }
    return defaultTheme;
  }
  return resolveTheme(
    allowed as NonEmptyArray<LunaCustomThemeKey>,
    requested,
    options,
  );
}

export type LunaResolvableTheme = { key: LunaCustomThemeKey };

export function resolveThemeObjectFromList<T extends LunaResolvableTheme>(
  themes: readonly T[],
  requested: LunaCustomThemeKey | undefined,
  options: LunaThemeResolverOptions & { onEmpty?: 'throw' | 'default' } = {},
): T | undefined {
  if (themes.length === 0) {
    if ((options.onEmpty ?? 'default') === 'throw') {
      throw new Error(
        'resolveThemeObjectFromList requires a non-empty themes list.',
      );
    }
    return undefined;
  }
  const keys = themes.map(t => t.key);
  const key = resolveThemeFromList(keys, requested, options);
  return themes.find(t => t.key === key);
}
