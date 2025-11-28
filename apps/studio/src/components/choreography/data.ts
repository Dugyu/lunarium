import type { StudioViewMode } from '@/types';

import type { StageMeta, ViewSpec } from './types.ts';
import { LynxUIComponentsRegistry } from '../../constants/component-data.ts';

const getMeta = LynxUIComponentsRegistry.getMeta;

const STAGES: Record<string, StageMeta> = {
  Bloom: { entry: 'ActBloom', theme: 'lunaris-light' },
  // Sheet: { entry: 'ActOneDark', theme: 'luna-dark' },
  MoonRise: {
    entry: 'ActMoonrise',
    theme: 'luna-light',
    meta: getMeta('button'),
    componentId: 'button',
  },
  MoonRiseDark: { entry: 'ActMoonrise', theme: 'luna-dark' },
  Switch: {
    entry: 'ActSwitch',
    theme: 'lunaris-dark',
    meta: getMeta('switch'),
    componentId: 'switch',
  },
  Slider: {
    entry: 'ActTwoDark',
    theme: 'luna-dark',
    meta: getMeta('slider'),
    componentId: 'slider',
  },
  Radio: {
    entry: 'ActRadioGroup',
    theme: 'lunaris-dark',
    meta: getMeta('radio-group'),
    componentId: 'radio-group',
  },
  ScrollView: {
    entry: 'OffstageActScrollView',
    theme: 'luna-dark',
    meta: getMeta('scroll-view'),
    componentId: 'scroll-view',
  },
  FeedList: {
    entry: 'OffstageActFeedList',
    theme: 'luna-dark',
    meta: getMeta('feed-list'),
    componentId: 'feed-list',
  },
  Swiper: {
    entry: 'OffstageActSwiper',
    theme: 'luna-dark',
    meta: getMeta('swiper'),
    componentId: 'swiper',
  },
  Popover: {
    entry: 'OffstageActPopover',
    theme: 'luna-light',
    meta: getMeta('popover'),
    componentId: 'popover',
  },
  Sheet: {
    entry: 'ActOneDark',
    theme: 'lunaris-dark',
    meta: getMeta('sheet'),
    componentId: 'sheet',
  },
  Dialog: {
    entry: 'OffstageActDialog',
    theme: 'luna-dark',
    meta: getMeta('dialog'),
    componentId: 'dialog',
  },
  Checkbox: {
    entry: 'ActCheckbox',
    theme: 'lunaris-dark',
    meta: getMeta('checkbox'),
    componentId: 'checkbox',
  },
  Input: {
    entry: 'ActTwoDark',
    theme: 'luna-dark',
    meta: getMeta('input'),
    componentId: 'input',
  },
};

const BASE_STATUS: Record<StudioViewMode, ViewSpec[]> = {
  compare: [
    { id: 'MoonRiseDark', 'className': 'flex-1 order-4' },
    { id: 'Sheet', 'className': 'flex-1 order-2' },
    { id: 'MoonRise', 'className': 'flex-1 order-3' },
    { id: 'Bloom', 'className': 'flex-1 order-1' },
  ],
  focus: [
    {
      id: 'Radio',
      'className': 'col-start-2 col-end-4 row-start-1 row-end-2 order-12',
    },
    {
      id: 'Switch',
      'className': 'col-start-2 col-end-4 row-start-1 row-end-2 order-11',
    },
    {
      id: 'ScrollView',
      'className': 'col-start-2 col-end-4 row-start-1 row-end-2 order-10',
    },
    {
      id: 'Checkbox',
      'className': 'col-start-2 col-end-4 row-start-1 row-end-2 order-9',
    },
    {
      id: 'FeedList',
      'className': 'col-start-2 col-end-4 row-start-1 row-end-2 order-8',
    },
    {
      id: 'Sheet',
      'className': 'col-start-2 col-end-4 row-start-1 row-end-2 order-2',
    },
    {
      id: 'Swiper',
      'className': 'col-start-2 col-end-4 row-start-1 row-end-2 order-6',
    },
    {
      id: 'Dialog',
      'className': 'col-start-2 col-end-4 row-start-1 row-end-2 order-5',
    },
    {
      id: 'Popover',
      'className': 'col-start-2 col-end-4 row-start-1 row-end-2 order-4',
    },
    {
      id: 'MoonRise', // Button
      'className': 'col-start-2 col-end-4 row-start-1 row-end-2 order-3',
    },
    {
      id: 'Bloom', // Bloom, Performance
      'className': 'col-start-1 col-end-2 row-start-1 row-end-2 order-1',
    },
  ],
  lineup: [
    {
      id: 'Radio',
      'className': 'col-start-5 col-end-6 row-start-1 row-end-2 order-12',
    },
    {
      id: 'Switch',
      'className': 'col-start-1 col-end-2 row-start-1 row-end-2 order-11',
    },
    {
      id: 'ScrollView',
      'className': 'col-start-5 col-end-6 row-start-2 row-end-2 order-10',
    },

    {
      id: 'Checkbox',
      'className': 'col-start-2 col-end-3 row-start-1 row-end-2 order-9',
    },
    {
      id: 'FeedList',
      'className': 'col-start-3 col-end-4 row-start-1 row-end-2 order-8',
    },
    {
      id: 'Sheet',
      'className': 'col-start-4 col-end-5 row-start-1 row-end-2 order-2',
    },
    {
      id: 'Swiper',
      'className': 'col-start-1 col-end-2 row-start-2 row-end-3 order-6',
    },
    {
      id: 'Dialog',
      'className': 'col-start-4 col-end-5 row-start-2 row-end-3 order-5',
    },
    {
      id: 'Popover',
      'className': 'col-start-3 col-end-4 row-start-2 row-end-3 order-4',
    },
    {
      id: 'MoonRise',
      'className': 'col-start-2 col-end-3 row-start-2 row-end-3 order-3',
    }, // Button
  ],
};

export { BASE_STATUS, STAGES };
