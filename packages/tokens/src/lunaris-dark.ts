import type { LunaThemeTokens } from '@dugyu/luna-core/theme';

export const lunarisDarkTokens: LunaThemeTokens = {
  key: 'lunaris-dark',
  variant: 'lunaris',
  mode: 'dark',
  colors: {
    primary: '#FF8AB5',
    'on-primary': '#010101',
    neutral: '#F8F8F8',
    'on-neutral': '#010101',
    'canvas': '#000000',
  },
} as const;
