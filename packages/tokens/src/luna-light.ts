import type { LunaThemeTokens } from '@dugyu/luna-core/theme';

export const lunaLightTokens: LunaThemeTokens = {
  key: 'luna-light',
  variant: 'luna',
  mode: 'light',
  colors: {
    primary: '#1A1A1A',
    'on-primary': '#FAFAFA',
    neutral: '#010101',
    'on-neutral': '#F8F8F8',
    'canvas': '#F4F4F4',
  },
} as const;
