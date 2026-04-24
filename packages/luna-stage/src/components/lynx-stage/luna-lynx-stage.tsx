// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import type { ReactNode } from 'react';
import { useMemo } from 'react';

import type { LunaThemeKey, LunaThemeVariant } from '@dugyu/luna-core';

import {
  CONTAINER_STYLE,
  DEFAULT_GROUP_ID,
  LYNX_VIEW_STYLE,
} from './lynx-stage-constants';
import { useLynxStage } from './use-lynx-stage';
import type { UseLynxStageOptions } from './use-lynx-stage';
import { useIsClient } from '../../hooks/use-is-client';
import type { LynxGlobalProps } from '../../types/lynx-view';

export type LunaLynxStageProps =
  & Omit<UseLynxStageOptions, 'globalProps' | 'bundleBaseUrl'>
  & {
    /** LUNA theme key, e.g. `'luna-light'`, `'lunaris-dark'`. */
    lunaTheme?: LunaThemeKey;
    /** LUNA theme variant, e.g. `'luna'`, `'lunaris'`. */
    lunaThemeVariant?: LunaThemeVariant;
    /**
     * Additional global props to inject alongside LUNA theme props.
     * Merged with the LUNA props — LUNA props take precedence on key conflicts.
     */
    extraGlobalProps?: LynxGlobalProps;
    /**
     * Base URL for bundle assets. Must end with a trailing slash.
     * The resolved bundle URL is: `${bundleBaseUrl}${entry}.web.bundle`
     * @defaultValue '/'
     */
    bundleBaseUrl?: string;
    /**
     * Shared Lynx worker group ID. Defaults to 7.
     * Override to isolate workers between unrelated view groups.
     */
    groupId?: number;
  };

function LunaLynxStageImpl({
  lunaTheme = 'luna-light',
  lunaThemeVariant = 'luna',
  extraGlobalProps,
  groupId = DEFAULT_GROUP_ID,
  bundleBaseUrl = '/',
  ...stageOptions
}: LunaLynxStageProps): ReactNode {
  const globalProps = useMemo<LynxGlobalProps>(() => ({
    ...(extraGlobalProps ?? {}),
    lunaTheme,
    lunaThemeVariant,
  }), [extraGlobalProps, lunaTheme, lunaThemeVariant]);

  const { lynxViewRef, containerRef } = useLynxStage({
    ...stageOptions,
    globalProps,
    bundleBaseUrl,
  });

  return (
    <div ref={containerRef} style={CONTAINER_STYLE}>
      <lynx-view
        ref={lynxViewRef}
        style={LYNX_VIEW_STYLE}
        lynx-group-id={groupId}
        transform-vh={true}
        transform-vw={true}
      />
    </div>
  );
}

export function LunaLynxStage(props: LunaLynxStageProps): ReactNode {
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  return <LunaLynxStageImpl {...props} />;
}
