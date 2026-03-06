// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { useContext } from 'react';

import { VisualSizeContext } from './visual-size-context.tsx';

export function useVisualSize() {
  const ctx = useContext(VisualSizeContext);
  if (!ctx) {
    throw new Error('useVisualSize must be used within VisualSizeProvider');
  }
  return ctx;
}
