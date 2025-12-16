// Core theme space
export type LunaThemeVariant = 'luna' | 'lunaris';
export type LunaThemeMode = 'light' | 'dark';
export type LunaThemeKey = `${LunaThemeVariant}-${LunaThemeMode}`;
export type LunaNeutralThemeKey = `luna-${LunaThemeMode}`;

// Custom extended theme space
export type LunaCustomThemeKey = LunaThemeKey | (string & {});
export type LunaCustomThemeVariant = LunaThemeVariant | (string & {});
export type LunaCustomThemeMode = LunaThemeMode | (string & {});
