import type { LunaThemeKey, LynxUIComponentId } from '@/types';

export { LynxUIComponentsRegistry } from './component-data.js';

export const ALL_LUNA_THEME_KEYS: LunaThemeKey[] = [
  'luna-light',
  'luna-dark',
  'lunaris-light',
  'lunaris-dark',
];

export const LUNA_SAVED_COMPONENT = 'luna-component';
export const LUNA_SAVED_THEME = 'luna-theme';
export const LUNA_DEFAULT_COMPONENT: LynxUIComponentId = 'button';
export const LUNA_STAGE_DEFAULT_THEME: LunaThemeKey = 'lunaris-dark';
export const LUNA_STUDIO_DEFAULT_THEME: LunaThemeKey = 'lunaris-light';

export const LUNA_STAGE_ONLY_COMPONENTS: LynxUIComponentId[] = ['swipe-action'];
export const LUNA_OFFSTAGE_COMPONENTS: LynxUIComponentId[] = [
  'sheet',
  'swiper',
  'dialog',
  'scroll-view',
  'feed-list',
  'swipe-action',
  'popover',
];

export const LUNA_STAGE_COMPONENTS: LynxUIComponentId[] = [
  'switch',
  'button',
  'checkbox',
  'radio-group',
];
