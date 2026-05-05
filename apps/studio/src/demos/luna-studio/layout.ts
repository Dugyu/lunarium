// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { resolveStudioLayout } from '@dugyu/luna-studio';
import type {
  StudioLayout,
  StudioModeGrid,
  StudioResolvedLayout,
  StudioStage,
} from '@dugyu/luna-studio';

const lunaStudioDemoModeGrid: StudioModeGrid = {
  compare: { cols: 4, rows: 1 },
  focus: { cols: 3, rows: 1 },
  lineup: { cols: 5, rows: 2 },
};

const stagePool: Record<string, StudioStage> = {
  Bloom: { id: 'Bloom', entry: 'ActBloom', theme: 'lunaris-light' },
  Checkbox: {
    id: 'Checkbox',
    entry: 'ActCheckbox',
    theme: 'lunaris-dark',
    focusKey: 'Checkbox',
  },
  Dialog: {
    id: 'Dialog',
    entry: 'OffstageActDialog',
    theme: 'luna-dark',
    focusKey: 'Dialog',
  },
  FeedList: {
    id: 'FeedList',
    entry: 'OffstageActFeedList',
    theme: 'luna-dark',
    focusKey: 'FeedList',
  },
  MoonRise: {
    id: 'MoonRise',
    entry: 'ActMoonrise',
    theme: 'luna-light',
    focusKey: 'MoonRise',
  },
  MoonRiseDark: {
    id: 'MoonRiseDark',
    entry: 'ActMoonrise',
    theme: 'luna-dark',
  },
  Popover: {
    id: 'Popover',
    entry: 'OffstageActPopover',
    theme: 'luna-light',
    focusKey: 'Popover',
  },
  Radio: {
    id: 'Radio',
    entry: 'ActRadioGroup',
    theme: 'lunaris-dark',
    focusKey: 'Radio',
  },
  ScrollView: {
    id: 'ScrollView',
    entry: 'OffstageActScrollView',
    theme: 'luna-dark',
    focusKey: 'ScrollView',
  },
  Sheet: {
    id: 'Sheet',
    entry: 'ActOneDark',
    theme: 'lunaris-dark',
    focusKey: 'Sheet',
  },
  Swiper: {
    id: 'Swiper',
    entry: 'OffstageActSwiper',
    theme: 'luna-dark',
    focusKey: 'Swiper',
  },
  Switch: {
    id: 'Switch',
    entry: 'ActSwitch',
    theme: 'lunaris-dark',
    focusKey: 'Switch',
  },
};

const layoutSpec: StudioLayout = {
  compare: [
    { id: 'MoonRiseDark', style: { gridColumn: '4 / 5', gridRow: '1 / 2' } },
    { id: 'Sheet', style: { gridColumn: '2 / 3', gridRow: '1 / 2' } },
    { id: 'MoonRise', style: { gridColumn: '3 / 4', gridRow: '1 / 2' } },
    { id: 'Bloom', style: { gridColumn: '1 / span 1', gridRow: '1 / span 1' } },
  ],
  focus: [
    { id: 'Radio', style: { gridColumn: '2 / 4', gridRow: '1 / 2' } },
    { id: 'Switch', style: { gridColumn: '2 / 4', gridRow: '1 / 2' } },
    { id: 'ScrollView', style: { gridColumn: '2 / 4', gridRow: '1 / 2' } },
    { id: 'Checkbox', style: { gridColumn: '2 / 4', gridRow: '1 / 2' } },
    { id: 'FeedList', style: { gridColumn: '2 / 4', gridRow: '1 / 2' } },
    { id: 'Sheet', style: { gridColumn: '2 / 4', gridRow: '1 / 2' } },
    { id: 'Swiper', style: { gridColumn: '2 / 4', gridRow: '1 / 2' } },
    { id: 'Dialog', style: { gridColumn: '2 / 4', gridRow: '1 / 2' } },
    { id: 'Popover', style: { gridColumn: '2 / 4', gridRow: '1 / 2' } },
    { id: 'MoonRise', style: { gridColumn: '2 / 4', gridRow: '1 / 2' } },
    { id: 'Bloom', style: { gridColumn: '1 / span 1', gridRow: '1 / span 1' } },
  ],
  lineup: [
    { id: 'Radio', style: { gridColumn: '5 / 6', gridRow: '1 / 2' } },
    { id: 'Switch', style: { gridColumn: '1 / 2', gridRow: '1 / 2' } },
    { id: 'ScrollView', style: { gridColumn: '5 / 6', gridRow: '2 / 3' } },
    { id: 'Checkbox', style: { gridColumn: '2 / 3', gridRow: '1 / 2' } },
    { id: 'FeedList', style: { gridColumn: '3 / 4', gridRow: '1 / 2' } },
    { id: 'Sheet', style: { gridColumn: '4 / 5', gridRow: '1 / 2' } },
    { id: 'Swiper', style: { gridColumn: '1 / 2', gridRow: '2 / 3' } },
    { id: 'Dialog', style: { gridColumn: '4 / 5', gridRow: '2 / 3' } },
    { id: 'Popover', style: { gridColumn: '3 / 4', gridRow: '2 / 3' } },
    { id: 'MoonRise', style: { gridColumn: '2 / 3', gridRow: '2 / 3' } },
  ],
};
const lunaStudioDemoLayout: StudioResolvedLayout = resolveStudioLayout({
  stagePool,
  layoutSpec,
});

export { lunaStudioDemoLayout, lunaStudioDemoModeGrid };
