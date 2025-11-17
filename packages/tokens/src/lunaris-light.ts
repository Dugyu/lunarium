import type {
  LunaThemeKey,
  LunaThemeMode,
  LunaThemeVariant,
} from '@dugyu/luna-core/theme';

export const lunarisLightTheme = {
  key: 'lunaris-light' as LunaThemeKey,
  variant: 'lunaris' as LunaThemeVariant,
  mode: 'light' as LunaThemeMode,
  colors: {
    primary: '#FF1A6E',
    onPrimary: '#FFFFFF',
    neutral: '#010101',
    onNeutral: '#F8F8F8',
  },
} as const;
