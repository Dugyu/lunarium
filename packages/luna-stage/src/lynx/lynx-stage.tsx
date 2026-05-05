// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import type { ReactNode } from 'react';

import {
  CONTAINER_STYLE,
  DEFAULT_GROUP_ID,
  LYNX_VIEW_STYLE,
} from './lynx-stage-constants';
import type { UseLynxStageOptions } from './types';
import { useLynxStage } from './use-lynx-stage';
import { useIsClient } from '../hooks';
import '../types/lynx-view';

export type LynxStageProps = Omit<UseLynxStageOptions, 'bundleRoot'> & {
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
   * @defaultValue 7
   */
  groupId?: number;
  /**
   * Enables pointer interactions on the underlying `<lynx-view>` host element.
   * @defaultValue true
   */
  interactive?: boolean;
};

function LynxStageImpl({
  bundleRoot,
  groupId = DEFAULT_GROUP_ID,
  interactive = true,
  ...stageOptions
}: LynxStageProps): ReactNode {
  const { lynxViewRef, containerRef } = useLynxStage({
    bundleRoot: bundleRoot ?? '/',
    ...stageOptions,
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

export function LynxStage(props: LynxStageProps): ReactNode {
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  return <LynxStageImpl {...props} />;
}
