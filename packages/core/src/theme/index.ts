/* ============================================================================
 * Theme keys & modes
 * ========================================================================== */

export type {
  LunaNeutralThemeKey,
  LunaThemeKey,
  LunaThemeMode,
  LunaThemeVariant,
  LunaCustomThemeKey,
  LunaCustomThemeMode,
  LunaCustomThemeVariant,
} from './keys.js';

/* ============================================================================
 * Theme tokens
 * ========================================================================== */

export type {
  LunaThemeTokens,
  LunaCustomThemeTokens,
  LunaCustomThemeMeta,
} from './tokens.js';

/* ============================================================================
 * Color
 * ========================================================================== */

export type { LunaColorId, LunaColorKey } from './color.js';

export {
  LUNA_COLOR_IDS,
  LUNA_COLOR_KEYS,
  colorIdToColorKey,
  colorKeyToColorId,
  createEmptyLunaColors,
} from './color.js';

/* ============================================================================
 * Theme resolver (public surface)
 * ========================================================================== */

/** Core resolver APIs */
export {
  resolveThemeKey,
  resolveThemeKeyFromList,
  resolveThemeObjectFromList,
  inferThemeMode,
} from './resolver.js';

/** Resolver configuration & contracts */
export type {
  LunaResolvableTheme,
  LunaThemeResolveRuleId,
  LunaThemeResolveRuleSpec,
  LunaThemeResolverFallback,
  LunaThemeResolverOnEmpty,
  LunaThemeResolverOptions,
} from './resolver.js';
