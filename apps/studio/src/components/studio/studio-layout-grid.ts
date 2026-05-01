// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import type { CSSProperties } from 'react';

import type {
  InteractionParams,
  LynxRuntimeCall,
  StudioLayout,
  StudioModeGrid,
  StudioStage,
} from '@dugyu/luna-studio';

import type { LunaThemeKey, StudioViewMode } from '@/types';

import { LynxUIComponentsRegistry } from '../../constants';

const getMeta = LynxUIComponentsRegistry.getMeta;

type StudioComponentExtension = {
  key: string;
  meta?: ReturnType<typeof getMeta>;
};

type StudioStageExtension = {
  component?: StudioComponentExtension;
};

type StageCatalogItem = {
  entry: string;
  theme: LunaThemeKey;
  studio?: StudioStageExtension;
};

type Cell = {
  col: number;
  row: number;
  colSpan?: number;
  rowSpan?: number;
};

const stageCatalog = {
  Bloom: { entry: 'ActBloom', theme: 'lunaris-light' },
  MoonRise: {
    entry: 'ActMoonrise',
    theme: 'luna-light',
    studio: {
      component: {
        key: 'button',
        meta: getMeta('button'),
      },
    },
  },
  MoonRiseDark: { entry: 'ActMoonrise', theme: 'luna-dark' },
  Switch: {
    entry: 'ActSwitch',
    theme: 'lunaris-dark',
    studio: {
      component: {
        key: 'switch',
        meta: getMeta('switch'),
      },
    },
  },
  Slider: {
    entry: 'ActTwoDark',
    theme: 'luna-dark',
    studio: {
      component: {
        key: 'slider',
        meta: getMeta('slider'),
      },
    },
  },
  Radio: {
    entry: 'ActRadioGroup',
    theme: 'lunaris-dark',
    studio: {
      component: {
        key: 'radio-group',
        meta: getMeta('radio-group'),
      },
    },
  },
  ScrollView: {
    entry: 'OffstageActScrollView',
    theme: 'luna-dark',
    studio: {
      component: {
        key: 'scroll-view',
        meta: getMeta('scroll-view'),
      },
    },
  },
  FeedList: {
    entry: 'OffstageActFeedList',
    theme: 'luna-dark',
    studio: {
      component: {
        key: 'feed-list',
        meta: getMeta('feed-list'),
      },
    },
  },
  Swiper: {
    entry: 'OffstageActSwiper',
    theme: 'luna-dark',
    studio: {
      component: {
        key: 'swiper',
        meta: getMeta('swiper'),
      },
    },
  },
  Popover: {
    entry: 'OffstageActPopover',
    theme: 'luna-light',
    studio: {
      component: {
        key: 'popover',
        meta: getMeta('popover'),
      },
    },
  },
  Sheet: {
    entry: 'ActOneDark',
    theme: 'lunaris-dark',
    studio: {
      component: {
        key: 'sheet',
        meta: getMeta('sheet'),
      },
    },
  },
  Dialog: {
    entry: 'OffstageActDialog',
    theme: 'luna-dark',
    studio: {
      component: {
        key: 'dialog',
        meta: getMeta('dialog'),
      },
    },
  },
  Checkbox: {
    entry: 'ActCheckbox',
    theme: 'lunaris-dark',
    studio: {
      component: {
        key: 'checkbox',
        meta: getMeta('checkbox'),
      },
    },
  },
  Input: {
    entry: 'ActTwoDark',
    theme: 'luna-dark',
    studio: {
      component: {
        key: 'input',
        meta: getMeta('input'),
      },
    },
  },
} satisfies Record<string, StageCatalogItem>;

type StageId = keyof typeof stageCatalog;
type StudioStageWithStudio = StudioStage & { studio?: StudioStageExtension };

type ModeLayoutItem = StageId | {
  id: StageId;
  cell: Cell;
};

function cell(
  col: number,
  row: number,
  colSpan = 1,
  rowSpan = 1,
): Cell {
  return { col, row, colSpan, rowSpan };
}

const modeGrid = {
  compare: { cols: 4, rows: 1 },
  focus: { cols: 3, rows: 1 },
  lineup: { cols: 5, rows: 2 },
} satisfies StudioModeGrid;

const modeLayout = {
  // Keep compare array order aligned with the legacy layout to avoid DOM reordering.
  compare: [
    { id: 'MoonRiseDark', cell: cell(4, 1) },
    { id: 'Sheet', cell: cell(2, 1) },
    { id: 'MoonRise', cell: cell(3, 1) },
    { id: 'Bloom', cell: cell(1, 1) },
  ],
  focus: [
    { id: 'Radio', cell: cell(2, 1, 2) },
    { id: 'Switch', cell: cell(2, 1, 2) },
    { id: 'ScrollView', cell: cell(2, 1, 2) },
    { id: 'Checkbox', cell: cell(2, 1, 2) },
    { id: 'FeedList', cell: cell(2, 1, 2) },
    { id: 'Sheet', cell: cell(2, 1, 2) },
    { id: 'Swiper', cell: cell(2, 1, 2) },
    { id: 'Dialog', cell: cell(2, 1, 2) },
    { id: 'Popover', cell: cell(2, 1, 2) },
    { id: 'MoonRise', cell: cell(2, 1, 2) },
    { id: 'Bloom', cell: cell(1, 1) },
  ],
  lineup: [
    { id: 'Radio', cell: cell(5, 1) },
    { id: 'Switch', cell: cell(1, 1) },
    { id: 'ScrollView', cell: cell(5, 2) },
    { id: 'Checkbox', cell: cell(2, 1) },
    { id: 'FeedList', cell: cell(3, 1) },
    { id: 'Sheet', cell: cell(4, 1) },
    { id: 'Swiper', cell: cell(1, 2) },
    { id: 'Dialog', cell: cell(4, 2) },
    { id: 'Popover', cell: cell(3, 2) },
    { id: 'MoonRise', cell: cell(2, 2) },
  ],
} satisfies Record<StudioViewMode, ModeLayoutItem[]>;

function getModeItemId(item: ModeLayoutItem): StageId {
  return typeof item === 'string' ? item : item.id;
}

function getModeItemCell(
  item: ModeLayoutItem,
  index: number,
): Cell {
  if (typeof item === 'string') {
    return cell(index + 1, 1);
  }
  return item.cell;
}

function toGridStyle(cellValue: Cell): CSSProperties {
  const colEnd = cellValue.col + (cellValue.colSpan ?? 1);
  const rowEnd = cellValue.row + (cellValue.rowSpan ?? 1);

  return {
    gridColumnStart: cellValue.col,
    gridColumnEnd: colEnd,
    gridRowStart: cellValue.row,
    gridRowEnd: rowEnd,
  };
}

function getStudioComponent(
  stage: StudioStage,
): StudioComponentExtension | undefined {
  return (stage as StudioStageWithStudio).studio?.component;
}

function findStageIdByComponentKey(componentKey: string): StageId | undefined {
  const entry = Object.entries(stageCatalog as Record<string, StageCatalogItem>)
    .find(([, stage]) => stage.studio?.component?.key === componentKey);
  return entry?.[0] as StageId | undefined;
}

function resolveModeLayout(mode: StudioViewMode): StudioStage[] {
  return modeLayout[mode].map((item, index) => {
    const id = getModeItemId(item);
    const stage: StageCatalogItem = stageCatalog[id];
    const stageCell = getModeItemCell(item, index);

    return {
      id,
      style: toGridStyle(stageCell),
      ...(stage.studio !== undefined ? { studio: stage.studio } : {}),
      ...(stage.studio?.component !== undefined ? { focusKey: id } : {}),
      entry: stage.entry,
      theme: stage.theme,
    };
  });
}

const DEFAULT_STUDIO_FOCUS_KEY: StageId = 'MoonRise';

function resolveStudioFocusKey(
  interaction: InteractionParams,
): string | undefined {
  if (interaction.target !== 'content') return undefined;
  const call: LynxRuntimeCall | undefined = interaction.runtimeCall;
  if (call === undefined) return undefined;
  if (call.name !== 'setFocusedComponent') return undefined;
  if (call.data === null || typeof call.data !== 'object') return undefined;

  const componentKey = (call.data as { id?: unknown }).id;
  if (typeof componentKey !== 'string') return undefined;

  return findStageIdByComponentKey(componentKey);
}

function buildStudioStageGlobalProps(params: {
  stage: StudioStage;
  viewMode: StudioViewMode;
  activeFocusKey: string;
}): Record<string, unknown> {
  const stageComponent = getStudioComponent(params.stage);
  const focusedStage =
    (stageCatalog as Record<string, StageCatalogItem>)[params.activeFocusKey];
  const focusedComponent = focusedStage?.studio?.component?.key;

  return {
    studioViewMode: params.viewMode,
    ...(focusedComponent !== undefined ? { focusedComponent } : {}),
    ...(stageComponent?.key !== undefined
      ? { componentEntry: stageComponent.key }
      : {}),
  };
}

/** Draft grid-first layout data kept next to the current Tailwind-string version for comparison. */
const studioLayoutGridDraft: StudioLayout = {
  compare: resolveModeLayout('compare'),
  focus: resolveModeLayout('focus'),
  lineup: resolveModeLayout('lineup'),
};

export type { Cell, ModeLayoutItem, StageCatalogItem, StageId };
export {
  buildStudioStageGlobalProps,
  DEFAULT_STUDIO_FOCUS_KEY,
  modeGrid,
  modeLayout,
  resolveStudioFocusKey,
  stageCatalog,
  studioLayoutGridDraft,
};
