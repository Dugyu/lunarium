import preset from '@lynx-js/tailwind-preset';
import type { Config } from 'tailwindcss';

const config: Config = {
  // 'content' config will be replaced by pluginTailwindCSS,
  // retains here for correct typing
  content: [],
  presets: [preset],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: 'var(--color-base)',
          content: 'var(--color-base-content)',
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
        },
        gradient: {
          a: 'var(--gradient-a)',
          b: 'var(--gradient-b)',
          c: 'var(--gradient-c)',
          d: 'var(--gradient-d)',
        },
      },
    },
  },
};

export default config;
