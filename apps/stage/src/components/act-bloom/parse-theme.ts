import type { LunaThemeKey, LunaThemeMode, LunaThemeVariant } from '@/types';

export function parseLunaThemeKey<K extends LunaThemeKey>(key: K) {
  const [variant, mode] = key.split('-') as [
    LunaThemeVariant,
    LunaThemeMode,
  ];
  return { variant, mode };
}
