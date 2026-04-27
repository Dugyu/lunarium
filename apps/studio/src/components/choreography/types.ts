// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import type { LunaThemeKey } from '@/types';

type ViewSpec = {
  id: string;
  className: string;
};

type StageMeta = {
  entry: string;
  theme: LunaThemeKey;
  componentId?: string;
} & Record<string, unknown>;

export type { ViewSpec, StageMeta };
