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
        canvas: {
          DEFAULT: 'var(--canvas)',
        },
        content: {
          DEFAULT: 'var(--content)',
          '2': 'var(--content-2)',
          'muted': 'var(--content-muted)',
          'muted-2': 'var(--content-muted-2)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          '2': 'var(--primary-2)',
          muted: 'var(--primary-muted)',
          content: 'var(--primary-content)',
        },
        neutral: {
          DEFAULT: 'var(--neutral)',
          '2': 'var(--neutral-2)',
          content: 'var(--neutral-content)',
          subtle: 'var(--neutral-subtle)',
          faint: 'var(--neutral-faint)',
          ambient: 'var(--neutral-ambient)',
          veil: 'var(--neutral-veil)',
          film: 'var(--neutral-film)',
        },
        line: 'var(--line)',
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
