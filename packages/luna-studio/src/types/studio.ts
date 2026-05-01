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

/**
 * Built-in studio presentation modes.
 * `compare` allows each stage to render with its own theme for side-by-side comparison,
 * `focus` renders all stages under a single shared theme and applies 3D focal emphasis,
 * while `lineup` renders all stages under a single shared theme without that focus treatment.
 */
export type StudioViewMode = 'compare' | 'focus' | 'lineup';

export type StudioGridSpec = {
  cols: number;
  rows: number;
};

export type StudioStage = {
  /** Stable stage identifier used for layout and event correlation. */
  id: string;
  /** Optional layout className applied to the stage container. */
  className?: string;
  /** Optional inline layout style applied to the stage container. */
  style?: CSSProperties;
  /** Optional per-stage bundle base URL that overrides the choreography-level default. */
  bundleBaseUrl?: string;
  /** Optional stage-level focus key used by choreography focus ordering and selection. */
  focusKey?: string;
  /** Lynx bundle entry rendered in this stage. */
  entry: string;
  /** Theme key applied to this stage when rendered in compare mode. */
  theme: LunaThemeKey;
} & Record<string, unknown>;

/** Layout data for the three built-in studio presentation modes. */
export type StudioLayout = Record<StudioViewMode, StudioStage[]>;

/** Optional mode-to-grid mapping used by grid-driven choreography containers. */
export type StudioModeGrid = Record<StudioViewMode, StudioGridSpec>;

/** Optional builder that derives Lynx global props for a stage render. */
export type StageGlobalPropsBuilder = (params: {
  /** Current stage being rendered. */
  stage: StudioStage;
  /** Active studio presentation mode. */
  viewMode: StudioViewMode;
  /** Resolved active focus key for the current choreography state. */
  activeFocusKey: string;
  /** Stage-level focus key associated with `stage`, if any. */
  focusKey: string | undefined;
}) => Record<string, unknown> | undefined;
