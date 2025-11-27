import type { LynxUIComponentId } from '@/types';

export { LynxUIComponentsRegistry } from './component-data.js';

export const LUNA_SAVED_COMPONENT = 'luna-component';
export const LUNA_SAVED_THEME = 'luna-theme';
export const LUNA_DEFAULT_COMPONENT: LynxUIComponentId = 'button';
export const LUNA_STAGE_ONLY_COMPONENTS: LynxUIComponentId[] = ['swipe-action'];
export const LUNA_OFFSTAGE_COMPONENTS: LynxUIComponentId[] = [
  'sheet',
  'swiper',
  'dialog',
  'scroll-view',
  'feed-list',
  'swipe-action',
];
