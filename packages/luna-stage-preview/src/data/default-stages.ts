// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import type { StudioViewMode } from '@dugyu/luna-catalog';

import type { StageMeta, ViewSpec } from '../components/choreography/types.js';

/**
 * Default stage configurations mapping stage IDs to Lynx bundle entries and themes.
 * Consumers can override this by passing a `stages` prop to Choreography / DynamicView.
 *
 * Note: the `meta` field (ComponentDef) is intentionally absent here.
 * It is app-specific data — consumers (e.g. apps/Studio) can inject it
 * via the `StageMeta`'s `& Record<string, unknown>` escape hatch.
 */
const STAGES: Record<string, StageMeta> = {
  Bloom: { entry: 'ActBloom', theme: 'lunaris-light' },
  MoonRise: {
    entry: 'ActMoonrise',
    theme: 'luna-light',
    componentId: 'button',
  },
  MoonRiseDark: { entry: 'ActMoonrise', theme: 'luna-dark' },
  Switch: {
    entry: 'ActSwitch',
    theme: 'lunaris-dark',
    componentId: 'switch',
  },
  Slider: {
    entry: 'ActTwoDark',
    theme: 'luna-dark',
    componentId: 'slider',
  },
  Radio: {
    entry: 'ActRadioGroup',
    theme: 'lunaris-dark',
    componentId: 'radio-group',
  },
  ScrollView: {
    entry: 'OffstageActScrollView',
    theme: 'luna-dark',
    componentId: 'scroll-view',
  },
  FeedList: {
    entry: 'OffstageActFeedList',
    theme: 'luna-dark',
    componentId: 'feed-list',
  },
  Swiper: {
    entry: 'OffstageActSwiper',
    theme: 'luna-dark',
    componentId: 'swiper',
  },
  Popover: {
    entry: 'OffstageActPopover',
    theme: 'luna-light',
    componentId: 'popover',
  },
  Sheet: {
    entry: 'ActOneDark',
    theme: 'lunaris-dark',
    componentId: 'sheet',
  },
  Dialog: {
    entry: 'OffstageActDialog',
    theme: 'luna-dark',
    componentId: 'dialog',
  },
  Checkbox: {
    entry: 'ActCheckbox',
    theme: 'lunaris-dark',
    componentId: 'checkbox',
  },
  Input: {
    entry: 'ActTwoDark',
    theme: 'luna-dark',
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
