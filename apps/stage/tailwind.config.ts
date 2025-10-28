import preset from '@lynx-js/tailwind-preset';
import type { Config } from 'tailwindcss';

const config: Config = {
  // 'content' config will be replaced by pluginTailwindCSS,
  // retains here for correct typing
  content: [],
  presets: [preset],
  theme: {
    extend: {
      fontSize: {
        xs: ['10px', { lineHeight: '13px' }],
        'caption': ['11px', { lineHeight: '14px' }],
        sm: ['12px', { lineHeight: '15px' }],
        'p2': ['13px', { lineHeight: '17px' }],
        base: ['14px', { lineHeight: '18px' }],
        lg: ['16px', { lineHeight: '21px' }],
        xl: ['17px', { lineHeight: '22px' }],
        '2xl': ['20px', { lineHeight: '25px' }],
      },
      colors: {
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
          '1': 'var(--color-neutral-1)',
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
      },
    },
  },
};

export default config;
