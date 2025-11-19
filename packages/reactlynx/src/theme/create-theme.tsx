import {
  LUNA_COLOR_IDS,
  colorIdToColorKey,
  createEmptyLunaColors,
} from './helpers.js';
import type { LunaRuntimeTheme, LunaThemeDefinition } from './types.js';

/**
 * Turn a unified theme definition (official tokens, custom tokens) into a runtime theme object consumable
 * by LunaThemeProvider and hooks.
 */
export function createLunaTheme(def: LunaThemeDefinition): LunaRuntimeTheme {
  const colors = createEmptyLunaColors();

  if ('colors' in def) {
    // Path A: tokens (official or custom) — fill actual values
    for (const id of LUNA_COLOR_IDS) {
      const camel = colorIdToColorKey(id);
      const realValue = def.colors[id];
      // Future: apply color-space transformation here when needed.
      colors[camel] = realValue ?? '';
    }
    return {
      key: def.key,
      variant: def.variant,
      mode: def.mode,
      colors,
    };
  }

  // Path B: meta-only config, typically for CSS-var-only pipeline.
  // keep all keys, values stay as '' from template

  return {
    key: def.key,
    variant: def.variant,
    mode: def.mode,
    colors,
  };
}
