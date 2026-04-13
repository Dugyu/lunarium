// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

// ─── Top-level orchestrator ───────────────────────────────────────────────────
export { Studio } from './components/studio/studio.js';
export type { StudioProps } from './components/studio/studio.js';

// ─── Multi-mode choreography ──────────────────────────────────────────────────
export { Choreography } from './components/choreography/choreography.js';
export type { ChoreographyProps } from './components/choreography/choreography.js';
export { DynamicView } from './components/choreography/dynamic-view.js';
export type { DynamicViewProps } from './components/choreography/dynamic-view.js';

// ─── Static phone mockup ──────────────────────────────────────────────────────
export { Mockup, MockupContainer } from './components/mockup/mockup.js';
export type { MockupProps } from './components/mockup/mockup.js';

// ─── Animated phone mockup (requires motion peer dep) ────────────────────────
export { MotionMockup } from './components/mockup-motion/mockup-motion.js';
export { MotionContainer } from './components/mockup-motion/container-motion.js';
export { MotionPresentation } from './components/mockup-motion/presentation-motion.js';

// ─── Lynx bundle renderer (browser-only, SSR-safe) ───────────────────────────
export { LunaLynxStage } from './components/lynx-stage/luna-lynx-stage.js';
export type { LunaLynxStageProps } from './components/lynx-stage/luna-lynx-stage.js';
export { LynxStage } from './components/lynx-stage/lynx-stage.js';
export type { LynxStageProps } from './components/lynx-stage/lynx-stage.js';

// ─── Layout primitives ────────────────────────────────────────────────────────
export { MenuBar } from './components/menu-bar/menu-bar.js';
export type { MenuBarProps } from './components/menu-bar/menu-bar.js';
export { StudioFrame } from './components/studio-frame/studio-frame.js';
export type { StudioFrameProps } from './components/studio-frame/studio-frame.js';
export { Container } from './components/container/container.js';

// ─── Context factory ──────────────────────────────────────────────────────────
export { createContextWithProvider } from './components/context/create-context.js';

// ─── Hooks (public utilities) ────────────────────────────────────────────────
export { useContainerResize } from './hooks/use-container-resize.js';
export { useEffectEvent } from './hooks/use-effect-event.js';
export { useIsomorphicLayoutEffect } from './hooks/use-isomorphic-layout-effect.js';
export { useMergedRefs } from './hooks/use-merged-refs.js';
// useRafClock is an internal debugging utility — not exported.

// ─── Types ────────────────────────────────────────────────────────────────────
export type { StageMeta, ViewSpec } from './components/choreography/types.js';
export type { MoonriseEvent } from './types/stage.js';

// Re-export commonly needed types from workspace deps
// so consumers don't need to add luna-catalog / luna-core just for types.
export type { StudioViewMode } from '@dugyu/luna-catalog';
export type {
  LunaThemeKey,
  LunaThemeMode,
  LunaThemeVariant,
} from '@dugyu/luna-core';

// ─── Default data ────────────────────────────────────────────────────────────
export { STAGES, BASE_STATUS } from './data/default-stages.js';

// ─── Utilities ────────────────────────────────────────────────────────────────
export { cn } from './utils/index.js';
