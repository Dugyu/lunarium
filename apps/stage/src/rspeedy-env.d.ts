/// <reference types="@lynx-js/rspeedy/client" />
import type {
  ComponentName,
  LunaNeutralThemeKey,
  LunaThemeVariant,
  StudioViewMode,
} from '@/types';

declare module '@lynx-js/types' {
  interface GlobalProps {
    /**
     * Define your global properties in this interface.
     * These types will be accessible through `lynx.__globalProps`.
     */
    lunaTheme: LunaNeutralThemeKey;
    studioViewMode: StudioViewMode;
    focusedComponent: ComponentName;
    componentEntry: ComponentName;
    lunaThemeVariant: LunaThemeVariant;
    theme: 'light' | 'dark' | 'Light' | 'Dark';
    frontendTheme: 'light' | 'dark' | 'Light' | 'Dark';
    preferredTheme: 'light' | 'dark' | 'Light' | 'Dark';
  }
}

declare module '@lynx-js/types' {
  interface NativeModules {
    ExplorerModule: {
      openSchema(url: string): void;
      saveThemePreferences(key: string, value: string): void;
    };
  }
}

declare global {
  const process: {
    env: {
      ASSET_PREFIX?: string;
      [key: string]: string | undefined;
    };
  };
}
