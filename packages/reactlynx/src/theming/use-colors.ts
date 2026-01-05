// use-colors.ts
import { useMemo } from '@lynx-js/react';

import {
  formatMetaOnlyValueError,
  resolveConsumptionFormat,
  toVarName,
} from './consumption.js';
import { LUNA_COLOR_KEYS, colorKeyToColorId } from './identity.js';
import type { LunaColorKey, UseLunaColorsOptions } from './types.js';
import { useLunaThemeContext } from './use-theme-context.js';

/**
 * Batch version of `useLunaColor`.
 */
export function useLunaColors(
  options: UseLunaColorsOptions = {},
): Record<LunaColorKey, string> {
  const ctx = useLunaThemeContext();
  if (!ctx) {
    throw new Error('[useLunaColors] must be used within <LunaThemeProvider>.');
  }

  const { theme } = ctx;
  const { as = 'result', format, cssVarPrefix } = options;

  return useMemo(() => {
    const resolved = resolveConsumptionFormat({
      as,
      format,
      themeFormat: theme.consumptionFormat,
    });

    if (resolved.kind === 'value') {
      if (theme.sourceType !== 'values') {
        throw new Error(formatMetaOnlyValueError({ hook: 'useLunaColors' }));
      }
      return theme.colors;
    }

    const prefix = cssVarPrefix ?? theme.cssVarPrefix;

    const out = {} as Record<LunaColorKey, string>;

    for (const key of LUNA_COLOR_KEYS) {
      const id = colorKeyToColorId(key);
      const varName = toVarName({ id, cssVarPrefix: prefix });

      out[key] = resolved.kind === 'var-name'
        ? varName
        : `var(${varName})`;
    }

    return out;
  }, [as, cssVarPrefix, format, theme]);
}
