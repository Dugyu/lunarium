import type { StudioViewMode } from '@/types';

import type { StageMeta, ViewSpec } from './types.ts';
import { LynxUIComponentsRegistry } from '../../constants/component-data.ts';

const getMeta = LynxUIComponentsRegistry.getMeta;

const STAGES: Record<string, StageMeta> = {
  A1L: { entry: 'ActBloom', theme: 'luna-light' },
  A1D: { entry: 'ActOneDark', theme: 'luna-dark' },
  A2L: {
    entry: 'ActMoonrise',
    theme: 'luna-light',
    meta: getMeta('button'),
    componentId: 'button',
  },
  A2D: { entry: 'ActMoonrise', theme: 'luna-dark' },
  Switch: {
    entry: 'ActBlueskies',
    theme: 'luna-light',
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
    entry: 'ActBlueskies',
    theme: 'luna-light',
    meta: getMeta('radio-group'),
    componentId: 'radio-group',
  },
  Toast: {
    entry: 'ActOneDark',
    theme: 'luna-dark',
    meta: getMeta('toast'),
    componentId: 'toast',
  },
  Popover: {
    entry: 'ActOneLight',
    theme: 'luna-light',
    meta: getMeta('popover'),
    componentId: 'popover',
  },
  Sheet: {
    entry: 'ActOneLight',
    theme: 'luna-light',
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
    entry: 'ActBlueskies',
    theme: 'luna-light',
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
    { id: 'A2D', 'className': 'flex-1 order-4' },
    { id: 'A1D', 'className': 'flex-1 order-2' },
    { id: 'A2L', 'className': 'flex-1 order-3' },
    { id: 'A1L', 'className': 'flex-1 order-1' },
  ],
  focus: [
    {
      id: 'Switch',
      'className': 'col-start-2 col-end-4 row-start-1 row-end-2 order-10',
    },
    {
      id: 'Checkbox',
      'className': 'col-start-2 col-end-4 row-start-1 row-end-2 order-9',
    },
    {
      id: 'Radio',
      'className': 'col-start-2 col-end-4 row-start-1 row-end-2 order-8',
    },
    {
      id: 'Sheet',
      'className': 'col-start-2 col-end-4 row-start-1 row-end-2 order-7',
    },
    {
      id: 'Toast',
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
      id: 'A2L',
      'className': 'col-start-2 col-end-4 row-start-1 row-end-2 order-3',
    },
    {
      id: 'A1L',
      'className': 'col-start-1 col-end-2 row-start-1 row-end-2 order-1',
    },
  ],
  lineup: [
    {
      id: 'Switch',
      'className': 'col-start-1 col-end-2 row-start-1 row-end-2 order-10',
    },
    {
      id: 'Checkbox',
      'className': 'col-start-2 col-end-3 row-start-1 row-end-2 order-9',
    },
    {
      id: 'Radio',
      'className': 'col-start-3 col-end-4 row-start-1 row-end-2 order-8',
    },
    {
      id: 'Sheet',
      'className': 'col-start-4 col-end-5 row-start-1 row-end-2 order-7',
    },
    {
      id: 'Toast',
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
      id: 'A2L',
      'className': 'col-start-2 col-end-3 row-start-2 row-end-3 order-3',
    }, // Button
  ],
};

export { BASE_STATUS, STAGES };
