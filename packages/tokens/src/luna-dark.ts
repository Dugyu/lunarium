import type {
  LunaThemeKey,
  LunaThemeMode,
  LunaThemeVariant,
} from '@dugyu/luna-core/theme';

export const lunaDarkTokens = {
  key: 'luna-dark' as LunaThemeKey,
  variant: 'luna' as LunaThemeVariant,
  mode: 'dark' as LunaThemeMode,
  colors: {
    primary: '#E0E0E0',
    onPrimary: '#010101',
    neutral: '#F8F8F8',
    onNeutral: '#010101',
  },
} as const;
