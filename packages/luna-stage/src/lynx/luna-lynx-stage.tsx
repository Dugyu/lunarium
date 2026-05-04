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
import type { UseLynxStageOptions } from './types';
import { useLynxStage } from './use-lynx-stage';
import { useIsClient } from '../hooks';
import type { LynxGlobalProps } from '../types/lynx-view';

export type LunaLynxStageProps =
  & Omit<UseLynxStageOptions, 'globalProps' | 'bundleRoot'>
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
     * Resource root used together with `entry` to locate the Lynx bundle.
     * The default resolver normalizes a trailing slash and builds
     * `${bundleRoot}${entry}.web.bundle`.
     * @defaultValue '/'
     */
    bundleRoot?: string;
    /**
     * Shared Lynx worker group ID. Defaults to 7.
     * Override to isolate workers between unrelated view groups.
     */
    groupId?: number;
    /**
     * Enables pointer interactions on the underlying `<lynx-view>` host element.
     * @defaultValue true
     */
    interactive?: boolean;
  };

function LunaLynxStageImpl({
  lunaTheme = 'luna-light',
  lunaThemeVariant = 'luna',
  extraGlobalProps,
  groupId = DEFAULT_GROUP_ID,
  bundleRoot = '/',
  interactive = true,
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
    bundleRoot,
  });

  return (
    <div ref={containerRef} style={CONTAINER_STYLE}>
      <lynx-view
        ref={lynxViewRef}
        style={{
          ...LYNX_VIEW_STYLE,
          pointerEvents: interactive ? 'auto' : 'none',
        }}
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
