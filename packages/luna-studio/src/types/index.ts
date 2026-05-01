// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import type { CSSProperties } from 'react';

import type {
  LunaThemeKey,
  LunaThemeMode,
  LunaThemeVariant,
} from '@dugyu/luna-core';

export type { LunaThemeKey, LunaThemeMode, LunaThemeVariant };

export type StudioViewMode = 'compare' | 'focus' | 'lineup';

export type StudioGridSpec = {
  cols: number;
  rows: number;
};

export type StageEntry = {
  /** Stable stage identifier used for layout and event correlation. */
  id: string;
  /** Optional layout className applied to the stage container. */
  className?: string;
  /** Optional inline layout style applied to the stage container. */
  style?: CSSProperties;
  /** Lynx bundle entry rendered in this stage. */
  entry: string;
  /** Theme key applied to this stage when rendered in compare mode. */
  theme: LunaThemeKey;
  /** Optional component identity used by focus logic and higher-level app glue. */
  componentId?: string;
} & Record<string, unknown>;

/** Layout data for the three built-in studio presentation modes. */
export type StudioLayout = Record<StudioViewMode, StageEntry[]>;

/** Optional mode-to-grid mapping used by grid-driven choreography containers. */
export type StudioModeGrid = Record<StudioViewMode, StudioGridSpec>;
