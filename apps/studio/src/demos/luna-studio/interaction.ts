// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { getPayloadString, indexResolvedLayout } from '@dugyu/luna-studio';
import type {
  FocusKeyResolver,
  InteractionParams,
  LunaThemeMode,
  LunaThemeVariant,
  StageGlobalPropsBuilder,
  StudioResolvedLayout,
} from '@dugyu/luna-studio';

type MoonriseEvent = {
  field: 'luna-variant' | 'light-mode' | 'autoplay' | 'trust' | 'subscribe';
  value: unknown;
};

function isMoonriseEvent(data: unknown): data is MoonriseEvent {
  if (data === null || typeof data !== 'object') return false;

  const event = data as { field?: unknown; value?: unknown };
  return event.field === 'luna-variant'
    || event.field === 'light-mode'
    || event.field === 'autoplay'
    || event.field === 'trust'
    || event.field === 'subscribe';
}

export function createDemoResolveFocusKey(
  layout: StudioResolvedLayout,
): FocusKeyResolver {
  const { focusKeys, stageIdToFocusKey } = indexResolvedLayout(layout);

  return (interaction: InteractionParams) => {
    if (interaction.target === 'stage') {
      return stageIdToFocusKey.get(interaction.stageId);
    }

    const call = interaction.runtimeCall;
    if (call.name !== 'setFocusedComponent') return undefined;

    const next = getPayloadString(call.data);
    if (next === undefined) return undefined;
    return focusKeys.has(next) ? next : undefined;
  };
}

export function createDemoStageGlobalPropsBuilder(): StageGlobalPropsBuilder {
  return ({ stage, viewMode, activeFocusKey, focusKey }) => {
    return {
      studioViewMode: viewMode,
      activeFocusKey,
      focusKey,
      stageId: stage.id,
      entry: stage.entry,
      ...(activeFocusKey !== '' ? { focusedComponent: activeFocusKey } : {}),
      ...(focusKey !== undefined ? { componentEntry: focusKey } : {}),
    };
  };
}

export function createDemoInteractionHandler(params: {
  onThemeVariantChange: (variant: LunaThemeVariant) => void;
  onThemeModeChange: (mode: LunaThemeMode) => void;
}): (interaction: InteractionParams) => void {
  return (interaction: InteractionParams) => {
    if (interaction.target !== 'content') return;
    const call = interaction.runtimeCall;
    if (call.name !== 'setMoonriseState') return;
    if (!isMoonriseEvent(call.data)) return;
    const event = call.data;

    if (event.field === 'luna-variant') {
      if (event.value === 'luna' || event.value === 'lunaris') {
        params.onThemeVariantChange(event.value);
      }
      return;
    }

    if (event.field === 'light-mode') {
      params.onThemeModeChange(event.value === true ? 'light' : 'dark');
    }
  };
}
