import { defineComponents } from '@dugyu/luna-core';

const components = [
  { id: 'button', demoReady: true },
  { id: 'checkbox', demoReady: true },
  { id: 'dialog', demoReady: true },
  { id: 'input', demoReady: false },
  { id: 'popover', demoReady: true },
  { id: 'radio-group', demoReady: true },
  { id: 'sheet', demoReady: true },
  { id: 'slider', demoReady: false },
  { id: 'switch', demoReady: true },
  { id: 'swiper', demoReady: true },
  { id: 'tooltip', demoReady: false },
  { id: 'toast', demoReady: true },
] as const;

export const LynxUIComponentsRegistry = defineComponents(
  components,
);
