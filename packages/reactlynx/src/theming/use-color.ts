// use-color.ts
import { useCallback } from '@lynx-js/react';

import {
  formatMetaOnlyValueError,
  resolveConsumptionFormat,
  toVarName,
} from './consumption.js';
import { colorKeyToColorId } from './identity.js';
import type { LunaColorKey, UseLunaColorOptions } from './types.js';
import { useLunaThemeContext } from './use-theme-context.js';

export function useLunaColor(
  options: UseLunaColorOptions = {},
): (key: LunaColorKey) => string {
  const ctx = useLunaThemeContext();
  if (!ctx) {
    throw new Error('[useLunaColor] must be used within <LunaThemeProvider>.');
  }

  const { theme } = ctx;

  const { as = 'result', format, cssVarPrefix } = options;

  const getColor = useCallback(
    (key: LunaColorKey): string => {
      const id = colorKeyToColorId(key);

      const resolved = resolveConsumptionFormat({
        as,
        format,
        themeFormat: theme.consumptionFormat,
      });

      const prefix = cssVarPrefix ?? theme.cssVarPrefix;
      const varName = toVarName({ id, cssVarPrefix: prefix });

      switch (resolved.kind) {
        case 'var-name':
          return varName;

        case 'var-ref':
          return `var(${varName})`;

        case 'value':
        default: {
          if (theme.sourceType !== 'values') {
            throw new Error(
              formatMetaOnlyValueError({ hook: 'useLunaColor' }),
            );
          }
          return theme.colors[key];
        }
      }
    },
    [as, cssVarPrefix, format, theme],
  );

  return getColor;
}
