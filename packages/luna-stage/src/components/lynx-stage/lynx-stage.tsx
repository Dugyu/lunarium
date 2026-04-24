// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import type { ReactNode } from 'react';

import {
  CONTAINER_STYLE,
  DEFAULT_GROUP_ID,
  LYNX_VIEW_STYLE,
} from './lynx-stage-constants';
import { useLynxStage } from './use-lynx-stage';
import type { UseLynxStageOptions } from './use-lynx-stage';
import { useMounted } from '../../hooks/use-mounted';
import '../../types/lynx-view';

export type LynxStageProps = Omit<UseLynxStageOptions, 'bundleBaseUrl'> & {
  /**
   * Base URL for bundle assets. Must end with a trailing slash.
   * The resolved bundle URL is: `${bundleBaseUrl}${entry}.web.bundle`
   * @defaultValue '/'
   */
  bundleBaseUrl?: string;
  /**
   * Shared Lynx worker group ID. Defaults to 7.
   * Override to isolate workers between unrelated view groups.
   * @defaultValue 7
   */
  groupId?: number;
};

function LynxStageImpl({
  bundleBaseUrl,
  groupId = DEFAULT_GROUP_ID,
  ...stageOptions
}: LynxStageProps): ReactNode {
  const { lynxViewRef, containerRef } = useLynxStage({
    bundleBaseUrl: bundleBaseUrl ?? '/',
    ...stageOptions,
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

export function LynxStage(props: LynxStageProps): ReactNode {
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  return <LynxStageImpl {...props} />;
}
