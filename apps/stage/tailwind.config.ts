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
          '1': 'var(--content-1)',
          '2': 'var(--content-2)',
        },
        'content-muted': {
          '1': 'var(--content-muted-1)',
        },
        primary: {
          '1': 'var(--primary-1)',
          content: 'var(--primary-content)',
        },
        line: 'var(--line)',
        neutral: {
          DEFAULT: 'var(--neutral)',
          content: 'var(--neutral-content)',
          faint: 'var(--neutral-faint)',
          subtle: 'var(--neutral-subtle)',
          veil: 'var(--neutral-veil)',
          film: 'var(--neutral-film)',
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
