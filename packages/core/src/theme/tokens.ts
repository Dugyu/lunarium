import type { LunaColorId } from './color.js';
import type {
  LunaCustomThemeKey,
  LunaCustomThemeMode,
  LunaCustomThemeVariant,
  LunaThemeKey,
  LunaThemeMode,
  LunaThemeVariant,
} from './keys.js';

/**
 * Official Luna theme tokens.
 */
export type LunaThemeTokens = {
  key: LunaThemeKey;
  variant: LunaThemeVariant;
  mode: LunaThemeMode;
  colors: Record<LunaColorId, string>;
};

/**
 * Custom theme meta: CSS-var-only or meta-based themes
 * that do not define concrete color values.
 */
export type LunaCustomThemeMeta = {
  key: LunaCustomThemeKey;
  variant: LunaCustomThemeVariant;
  mode: LunaCustomThemeMode;
};

/**
 * Custom theme tokens: user provided tokens
 * with custom `key`/`variant`/`mode` and actual color values.
 * Structure is similar to LunaThemeTokens, but not restricted
 * to the official `key`/`variant`/`mode` space.
 */
export type LunaCustomThemeTokens = {
  key: LunaCustomThemeKey; // allow custom keys
  variant: LunaCustomThemeVariant; // e.g. "cosmic"
  mode: LunaCustomThemeMode; // e.g. "night"
  colors: Record<LunaColorId, string>;
};
