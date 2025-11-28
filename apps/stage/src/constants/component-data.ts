import { defineComponents } from '@dugyu/luna-core';

const components = [
  { id: 'button', demoReady: true },
  { id: 'checkbox', demoReady: true },
  { id: 'dialog', demoReady: true },
  { id: 'radio-group', demoReady: true },
  { id: 'sheet', demoReady: true },
  { id: 'switch', demoReady: true },
  { id: 'swiper', demoReady: true },
  { id: 'scroll-view', demoReady: true },
  { id: 'swipe-action', demoReady: true },
  { id: 'sortable', demoReady: true },
  { id: 'motion-basic', demoReady: true },
  { id: 'motion-spring', demoReady: true },
  { id: 'motion-stagger', demoReady: true },
  { id: 'motion-slider', demoReady: true },
] as const;

export const LynxUIComponentsRegistry = defineComponents(
  components,
);
