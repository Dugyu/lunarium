import type { LunaThemeVariant } from '@dugyu/luna-core';

type MoonriseEvent =
  | { field: 'luna-variant'; value: LunaThemeVariant }
  | {
    field: 'light-mode';
    value: boolean;
  }
  | { field: 'autoplay'; value: boolean }
  | { field: 'trust'; value: boolean }
  | { field: 'subscribe'; value: boolean };

type onMoonriseEvent = (e: MoonriseEvent) => void;

export type { onMoonriseEvent, MoonriseEvent };
