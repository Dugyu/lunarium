// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import type { LunaThemeKey, StudioViewMode } from '@/types';

type ViewSpec = {
  /** Stable stage identifier used for layout and event correlation. */
  id: string;
  /** Additional layout className applied to the stage container. */
  className: string;
};

type StageMeta = {
  /** Lynx bundle entry rendered in this stage. */
  entry: string;
  /** Theme key applied to this stage when rendered in compare mode. */
  theme: LunaThemeKey;
  /** Optional component identity used by focus logic and higher-level app glue. */
  componentId?: string;
} & Record<string, unknown>;

type StageEventType =
  | 'click'
  | 'pointercancel'
  | 'pointerdown'
  | 'pointerup';

type StageEvent = {
  /** High-level interaction kind observed on the Web stage container. */
  type: StageEventType;
  /** Current studio layout mode when the event is emitted. */
  viewMode: StudioViewMode;
  /** Stage data associated with the hit container. */
  stage: ViewSpec & StageMeta;
  /** Original DOM event forwarded from the stage container binding. */
  nativeEvent: MouseEvent | PointerEvent;
};

export type { StageEvent, StageEventType, ViewSpec, StageMeta };
