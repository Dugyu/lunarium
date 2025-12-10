import { defineComponents } from '@dugyu/luna-catalog';

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
  { id: 'toast', demoReady: false },
  { id: 'scroll-view', demoReady: true, name: 'ScrollView' },
  { id: 'feed-list', demoReady: true, name: 'FeedList' },
] as const;

export const LynxUIComponentsRegistry = defineComponents(
  components,
);
