// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import type { LunaThemeKey } from '@dugyu/luna-core';

type ViewSpec = {
  id: string;
  className: string;
};

/**
 * Configuration for a single stage item (Lynx bundle + theme).
 * `componentId` is typed as `string` (not a narrow literal union)
 * so the package is not coupled to a specific component registry.
 * Consumers can extend this type via `& Record<string, unknown>`.
 */
type StageMeta = {
  entry: string;
  theme: LunaThemeKey;
  componentId?: string;
} & Record<string, unknown>;

export type { ViewSpec, StageMeta };
