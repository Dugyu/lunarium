// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import type { LunaThemeVariant } from '@dugyu/luna-core';

import type { LynxUIComponentsRegistry } from '@/constants';

export type LynxUIComponentId = (typeof LynxUIComponentsRegistry.ids)[number];
export type LynxUIComponentDef = (typeof LynxUIComponentsRegistry.list)[number];
export type LynxUIComponentIdReady =
  (typeof LynxUIComponentsRegistry.readyIds)[number];

export type {
  LunaThemeKey,
  LunaThemeMode,
  LunaThemeVariant,
} from '@dugyu/luna-core';

export type { StudioViewMode } from '@dugyu/luna-studio';

export type MoonriseEvent =
  | { field: 'luna-variant'; value: LunaThemeVariant }
  | {
    field: 'light-mode';
    value: boolean;
  }
  | { field: 'autoplay'; value: boolean }
  | { field: 'trust'; value: boolean }
  | { field: 'subscribe'; value: boolean };
