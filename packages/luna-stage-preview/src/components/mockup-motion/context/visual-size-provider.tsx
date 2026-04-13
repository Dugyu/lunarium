// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { useMemo } from 'react';
import type { JSX, ReactNode } from 'react';

import { VisualSizeContext } from './visual-size-context.js';
import type { VisualSizeValue } from './visual-size-context.js';

type VisualSizeProviderProps = VisualSizeValue & {
  children?: ReactNode;
};
export function VisualSizeProvider({
  visualW,
  visualH,
  children,
}: VisualSizeProviderProps): JSX.Element {
  const value: VisualSizeValue = useMemo(
    () => ({ visualW, visualH }),
    [visualW, visualH],
  );
  return (
    <VisualSizeContext.Provider value={value}>
      {children}
    </VisualSizeContext.Provider>
  );
}
