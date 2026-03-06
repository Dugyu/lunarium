// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import type { GlobalProps } from '@lynx-js/types';

import type { LunaCustomThemeKey } from '@dugyu/luna-core';

declare module '@lynx-js/types' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface GlobalProps {
    lunaTheme?: LunaCustomThemeKey;
  }
}

export type { GlobalProps };
