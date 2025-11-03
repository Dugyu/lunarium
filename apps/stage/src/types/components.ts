import type { LynxUIComponentsRegistry } from '@/constants';

export type LynxUIComponentId = (typeof LynxUIComponentsRegistry.ids)[number];
export type LynxUIComponentDef = (typeof LynxUIComponentsRegistry.list)[number];
export type LynxUIComponentIdReady =
  (typeof LynxUIComponentsRegistry.readyIds)[number];
