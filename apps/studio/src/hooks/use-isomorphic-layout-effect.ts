// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { useEffect, useLayoutEffect } from 'react';

const isServer = typeof window === 'undefined'
  || typeof document === 'undefined';

const useIsomorphicLayoutEffect = isServer ? useLayoutEffect : useEffect;

export { useIsomorphicLayoutEffect };
