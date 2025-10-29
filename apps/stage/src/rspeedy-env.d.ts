/// <reference types="@lynx-js/rspeedy/client" />
import type { ComponentName, LunaThemeVariant } from '@/types';

declare module '@lynx-js/types' {
  interface GlobalProps {
    /**
     * Define your global properties in this interface.
     * These types will be accessible through `lynx.__globalProps`.
     */
    lunaTheme: 'luna-light' | 'luna-dark';
    studioViewMode: 'compare' | 'focus' | 'lineup';
    focusedComponent: ComponentName;
    componentEntry: ComponentName;
    lunaThemeVariant: LunaThemeVariant;
  }
}
