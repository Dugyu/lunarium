import { defineComponents } from '@dugyu/luna-core';

const components = [
  { id: 'button', demoReady: true },
  { id: 'checkbox', demoReady: true },
  { id: 'dialog', demoReady: true },
  { id: 'popover', demoReady: true },
  { id: 'radio-group', demoReady: true },
  { id: 'sheet', demoReady: true },
  { id: 'switch', demoReady: true },
  { id: 'swiper', demoReady: true },
  { id: 'scroll-view', demoReady: true },
  { id: 'feed-list', demoReady: true },
  { id: 'swipe-action', demoReady: true },
] as const;

export const LynxUIComponentsRegistry = defineComponents(
  components,
);
