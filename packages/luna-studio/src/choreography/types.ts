// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import type { StageEntry, StudioViewMode } from '../types';

export type StageEventType =
  | 'click'
  | 'pointercancel'
  | 'pointerdown'
  | 'pointerup';

export type StageEvent = {
  /** High-level interaction kind observed on the Web stage container. */
  type: StageEventType;
  /** Current studio layout mode when the event is emitted. */
  viewMode: StudioViewMode;
  /** Stage data associated with the hit container. */
  stage: StageEntry;
  /** Original DOM event forwarded from the stage container binding. */
  nativeEvent: MouseEvent | PointerEvent;
};
