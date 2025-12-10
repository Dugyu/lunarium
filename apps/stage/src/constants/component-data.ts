import { defineComponents } from '@dugyu/luna-catalog';

const components = [
  { id: 'button', demoReady: true },
  { id: 'checkbox', demoReady: true },
  { id: 'dialog', demoReady: true },
  { id: 'popover', demoReady: true },
  { id: 'radio-group', demoReady: true },
  { id: 'sheet', demoReady: true },
  { id: 'switch', demoReady: true },
  { id: 'swiper', demoReady: true },
  { id: 'scroll-view', demoReady: true, name: 'ScrollView' },
  { id: 'feed-list', demoReady: true, name: 'FeedList' },
  { id: 'swipe-action', demoReady: true, name: 'SwipeAction' },
  { id: 'sortable', demoReady: true },
  { id: 'motion-basic', demoReady: true, name: 'Motion: Basic' },
  { id: 'motion-spring', demoReady: true, name: 'Motion: Spring' },
  { id: 'motion-stagger', demoReady: true, name: 'Motion: Stagger' },
  { id: 'motion-slider', demoReady: true, name: 'Motion: Slider' },
] as const;

export const LynxUIComponentsRegistry = defineComponents(
  components,
);
