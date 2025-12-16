import { useCallback } from '@lynx-js/react';

import { colorKeyToColorId } from './helpers.js';
import type { LunaColorKey, UseLunaColorOptions } from './types.js';
import { useLunaTheme } from './use-theme.js';

export function useLunaColor(
  options: UseLunaColorOptions = {},
): (key: LunaColorKey) => string {
  const { theme } = useLunaTheme();
  const {
    as = 'value',
    cssVarPrefix = 'luna',
  } = options;

  const getColor = useCallback(
    (key: LunaColorKey): string => {
      const id = colorKeyToColorId(key);
      const varName = `--${cssVarPrefix}-${id}`;

      switch (as) {
        case 'var-name':
          // return CSS variable name
          return varName;

        case 'var-ref':
          // return CSS variable reference "var(--...)"
          return `var(${varName})`;

        case 'value':
        default:
          // return raw value
          return theme.colors[key] || '';
      }
    },
    [as, cssVarPrefix, theme],
  );

  return getColor;
}
