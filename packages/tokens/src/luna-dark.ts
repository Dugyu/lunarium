import type { LunaThemeTokens } from '@dugyu/luna-core/theme';

export const lunaDarkTokens: LunaThemeTokens = {
  key: 'luna-dark',
  variant: 'luna',
  mode: 'dark',
  colors: {
    'primary-1': '#e0e0e0',
    'primary-content': '#010101',
    'neutral-1': '#f8f8f8',
    'neutral-content': '#010101',
    'canvas': '#000000',
  },
} as const;
