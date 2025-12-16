import type { GlobalProps } from '@lynx-js/types';

import type { LunaCustomThemeKey } from '@dugyu/luna-core';

declare module '@lynx-js/types' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface GlobalProps {
    lunaTheme?: LunaCustomThemeKey;
  }
}

export type { GlobalProps };
