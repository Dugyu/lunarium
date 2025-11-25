import type { Config } from 'tailwindcss';

import { LUNA_COLOR_IDS } from '@dugyu/luna-core/theme';

import { buildLunaTailwindColors } from './color.js';

// Options for the Luna Tailwind plugin
type LunaTailwindOptions = {
  /**
   * Optional CSS variable prefix used in the theme.
   *
   * - undefined / empty: uses `var(--primary)` style
   * - "luna"           : uses `var(--luna-primary)` style
   *
   * This should stay in sync with your CSS generator:
   *  `--${prefix}-${id}` / `--${id}`.
   */
  cssVarPrefix?: string;
};

// Internal helper to build the theme extension
function createLunaPreset(
  options?: LunaTailwindOptions,
) {
  const { cssVarPrefix } = options ?? {};

  const colorExtensions = buildLunaTailwindColors(
    LUNA_COLOR_IDS,
    cssVarPrefix,
  );

  return {
    theme: {
      extend: {
        fontSize: {
          xs: ['10px', { lineHeight: '13px' }],
          caption: ['11px', { lineHeight: '14px' }],
          sm: ['12px', { lineHeight: '15px' }],
          p2: ['13px', { lineHeight: '17px' }],
          base: ['14px', { lineHeight: '18px' }],
          lg: ['16px', { lineHeight: '21px' }],
          xl: ['17px', { lineHeight: '22px' }],
          '2xl': ['20px', { lineHeight: '25px' }],
        },
        colors: colorExtensions,
      },
    },
  } satisfies Partial<Config>;
}

const LunaPreset = createLunaPreset();

export { createLunaPreset, LunaPreset };
export type { LunaTailwindOptions };

export default LunaPreset;
