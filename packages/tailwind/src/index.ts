import type { Config } from 'tailwindcss';

// Options for the Luna Tailwind plugin
export type LunaTailwindOptions = {
  /**
   * Optional namespace for colors.
   *
   * - undefined: colors are registered at root (primary, neutral, ...)
   * - "luna"   : colors are under `colors.luna.*` => e.g. `text-luna-primary`
   */
  colorNamespace?: string;
};

// Internal helper to build the theme extension
export const createLunaPreset = (
  options?: LunaTailwindOptions,
) => {
  const colorExtensions = {
    base: {
      '1': 'var(--color-base)',
      content: 'var(--color-base-content)',
      'content-2': 'var(--color-base-content-2)',
      'content-3': 'var(--color-base-content-3)',
    },
    content: 'var(--color-base-content)',
    primary: {
      DEFAULT: 'var(--color-primary)',
      content: 'var(--color-primary-content)',
    },
    secondary: {
      DEFAULT: 'var(--color-secondary)',
      content: 'var(--color-secondary-content)',
    },
    muted: {
      DEFAULT: 'var(--color-muted)',
      content: 'var(--color-muted-content)',
    },
    neutral: {
      DEFAULT: 'var(--color-neutral)',
      content: 'var(--color-neutral-content)',
      '2': 'var(--color-neutral-2)',
      '3': 'var(--color-neutral-3)',
      '4': 'var(--color-neutral-4)',
    },
    gradient: {
      a: 'var(--gradient-a)',
      b: 'var(--gradient-b)',
      c: 'var(--gradient-c)',
      d: 'var(--gradient-d)',
    },
  };

  const colors = options?.colorNamespace != null
    ? {
      // Nest the whole palette under a namespace:
      // colors.luna.primary => class `text-luna-primary`
      [options.colorNamespace]: colorExtensions,
    }
    : colorExtensions;
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
        colors,
      },
    },
  } satisfies Partial<Config>;
};

export default createLunaPreset;
