import type {
  LunaThemeKey,
  LunaThemeMode,
  LunaThemeVariant,
} from '@dugyu/luna-core/theme';

export const lunarisDarkTokens = {
  key: 'lunaris-light' as LunaThemeKey,
  variant: 'lunaris' as LunaThemeVariant,
  mode: 'dark' as LunaThemeMode,
  colors: {
    primary: '#FF8AB5',
    onPrimary: '#010101',
    neutral: '#F8F8F8',
    onNeutral: '#010101',
  },
} as const;
