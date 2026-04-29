// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { useCallback, useState } from 'react';

export function useControllableState<T>(
  value: T | undefined,
  defaultValue: T,
  onChange: ((next: T) => void) | undefined,
) {
  const [uncontrolled, setUncontrolled] = useState<T>(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : uncontrolled;
  const set = useCallback((next: T) => {
    if (!isControlled) setUncontrolled(next);
    onChange?.(next);
  }, [isControlled, onChange]);
  return [current, set] as const;
}
