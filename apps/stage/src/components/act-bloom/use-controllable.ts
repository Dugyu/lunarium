// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { useRef, useState } from '@lynx-js/react';

type UseControllableProps<T> = {
  value?: T;
  defaultValue: T;
  onValueChange?: (value: T) => void;
};

function useControllable<T>({
  value: valueProp,
  defaultValue,
  onValueChange,
}: UseControllableProps<T>) {
  const isControlled = valueProp !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const lastValueRef = useRef<T>();

  const value = isControlled ? valueProp : uncontrolledValue;

  const setValue = (next: T | ((prev: T) => T)) => {
    const resolvedValue = typeof next === 'function'
      ? (next as (prev: T) => T)(value)
      : next;

    if (Object.is(value, resolvedValue)) return;

    if (!isControlled) {
      lastValueRef.current = resolvedValue;
      setUncontrolledValue(resolvedValue);
    }
    onValueChange?.(resolvedValue);
  };

  return [value, setValue] as const;
}

export { useControllable };
export type { UseControllableProps };
