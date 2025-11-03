/// <reference types="@lynx-js/rspeedy/client" />
import type {
  LunaNeutralThemeKey,
  LunaThemeVariant,
  LynxUIComponentId,
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
    focusedComponent: LynxUIComponentId;
    componentEntry: LynxUIComponentId;
    lunaThemeVariant: LunaThemeVariant;
    testTheme: 'light' | 'dark' | 'Light' | 'Dark';
    theme: 'light' | 'dark' | 'Light' | 'Dark';
    frontendTheme: 'light' | 'dark' | 'Light' | 'Dark';
  }
}

declare module '@lynx-js/types' {
  interface NativeModules {
    ExplorerModule: {
      openSchema(url: string): void;
      saveToLocalStorage(key: string, value: string): void;
      readFromLocalStorage(key: string): string | null;
    };
  }
}

declare global {
  const __WEB__: boolean;
  const process: {
    env: {
      ASSET_PREFIX?: string;
      [key: string]: string | undefined;
    };
  };
}
