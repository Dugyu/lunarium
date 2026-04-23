// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import type { CSSProperties } from 'react';

import type { CSSVarProperties } from '../../types/lynx-view';

export const LYNX_VIEW_STYLE: CSSProperties & CSSVarProperties = {
  width: '100%',
  height: '100%',
  pointerEvents: 'all',
  containerType: 'size',
  '--rpx-unit': 'calc(100cqw / 750)',
  '--vh-unit': '1cqh',
  '--vw-unit': '1cqw',
};

export const CONTAINER_STYLE: CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '100%',
};

export const DEFAULT_GROUP_ID = 7;
