import type { LunaThemeVariant } from './theme.ts';

export type MoonriseEvent =
  | { field: 'luna-variant'; value: LunaThemeVariant }
  | {
    field: 'light-mode';
    value: boolean;
  }
  | { field: 'autoplay'; value: boolean }
  | { field: 'trust'; value: boolean }
  | { field: 'subscribe'; value: boolean };
