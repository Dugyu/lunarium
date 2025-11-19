import type { LunaThemeTokens } from '@dugyu/luna-core/theme';

export const lunaDarkTokens: LunaThemeTokens = {
  key: 'luna-dark',
  variant: 'luna',
  mode: 'dark',
  colors: {
    primary: '#E0E0E0',
    'on-primary': '#010101',
    neutral: '#F8F8F8',
    'on-neutral': '#010101',
    'canvas': '#000000',
  },
} as const;
