// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { useState } from 'react';

import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect.js';

export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useIsomorphicLayoutEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
