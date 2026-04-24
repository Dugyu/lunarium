// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

// ─── Hooks (public utilities) ────────────────────────────────────────────────
export {
  useContainerResize,
  useEffectEvent,
  useIsomorphicLayoutEffect,
  useMergedRefs,
  useIsClient,
} from './hooks';

// ─── Static phone stage ──────────────────────────────────────────────────────
export { Stage, StageContainer } from './components/stage';
export type { StageProps, StageBaseProps } from './types/stage-props';

// ─── Lynx stage ────────────────────────────────────────────────────────────────
export { LynxStage } from './components/lynx-stage';
export type { LynxStageProps } from './components/lynx-stage';

export { useLynxStage } from './components/lynx-stage';
export type {
  UseLynxStageOptions,
  UseLynxStageResult,
} from './components/lynx-stage';

export { LunaLynxStage } from './components/lynx-stage';
export type { LunaLynxStageProps } from './components/lynx-stage';
