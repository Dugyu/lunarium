// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import type { LynxView } from '@lynx-js/web-core';
import type { CSSProperties, Ref } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lynx-view': {
        url?: string;
        ref?: Ref<LynxView>;
        style?: CSSProperties;
        ['lynx-group-id']?: number;
      };
    }
  }
}
