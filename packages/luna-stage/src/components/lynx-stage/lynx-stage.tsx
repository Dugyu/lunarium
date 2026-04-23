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

// Container-relative unit hooks for Lynx runtime:
// - `containerType: 'size'` enables `cqw/cqh` units based on the host element box.
// - `--vh-unit/--vw-unit` make `vh/vw` behave like "container viewport" inside `<lynx-view>`.
// - `--rpx-unit` aligns `rpx` scaling with a 750-wide design baseline (mobile-like behavior).
// Note: web-core already applies `contain: content` internally; combined with `containerType: 'size'`
// this effectively behaves like `contain: strict` without us overriding containment explicitly.
// ─── Component ────────────────────────────────────────────────────────────────

export function LynxStage({
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
