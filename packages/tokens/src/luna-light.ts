import type {
  LunaThemeKey,
  LunaThemeMode,
  LunaThemeVariant,
} from '@dugyu/luna-core/theme';

export const lunaLightTheme = {
  key: 'luna-light' as LunaThemeKey,
  variant: 'luna' as LunaThemeVariant,
  mode: 'light' as LunaThemeMode,
  colors: {
    primary: '#1A1A1A',
    onPrimary: '#FAFAFA',
    neutral: '#010101',
    onNeutral: '#F8F8F8',
  },
} as const;
