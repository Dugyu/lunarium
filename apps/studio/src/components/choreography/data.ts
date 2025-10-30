import type { StudioViewMode } from '@/types';

import type { StageMeta, ViewSpec } from './types.ts';

const STAGES: Record<string, StageMeta> = {
  A1L: { entry: 'ActBloom', theme: 'luna-light' },
  A1D: { entry: 'ActOneDark', theme: 'luna-dark' },
  A2L: { entry: 'ActMoonrise', theme: 'luna-light', componentName: 'Button' },
  A2D: { entry: 'ActMoonrise', theme: 'luna-dark' },
  Switch: {
    entry: 'ActBlueskies',
    theme: 'luna-light',
    componentName: 'Switch',
  },
  Slider: { entry: 'ActTwoDark', theme: 'luna-dark', componentName: 'Slider' },
  Radio: {
    entry: 'ActBlueskies',
    theme: 'luna-light',
    componentName: 'Radio Group',
  },
  Toast: { entry: 'ActOneDark', theme: 'luna-dark', componentName: 'Toast' },
  Popover: {
    entry: 'ActOneLight',
    theme: 'luna-light',
    componentName: 'Popover',
  },
  Sheet: { entry: 'ActOneLight', theme: 'luna-light', componentName: 'Sheet' },
  Dialog: { entry: 'ActOneDark', theme: 'luna-dark', componentName: 'Dialog' },
  Checkbox: {
    entry: 'ActBlueskies',
    theme: 'luna-light',
    componentName: 'Checkbox',
  },
  Input: { entry: 'ActTwoDark', theme: 'luna-dark', componentName: 'Input' },
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
