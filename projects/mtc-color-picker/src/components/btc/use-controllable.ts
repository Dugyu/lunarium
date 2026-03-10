// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { useCallback, useEffect, useRef, useState } from '@lynx-js/react';
import type { Dispatch, SetStateAction } from '@lynx-js/react';

import type { Expand } from '@/types/utils';

import { noop, useEffectEvent } from './use-effect-event';

function isUpdater<T>(v: SetStateAction<T>): v is (prev: T) => T {
  return typeof v === 'function';
}

type UseControllableProps<T> = {
  value?: T | undefined;
  initialValue?: T | undefined;
  onChange?: (value: T) => void;
};

function useControllable<T>({
  value: controlled,
  onChange,
  initialValue,
}: UseControllableProps<T>) {
  const [uncontrolled, setUncontrolled] = useUncontrolled({
    initialValue,
    onChange,
  });

  const isControlled = controlled !== undefined;

  const stableOnChange = useEffectEvent(onChange ?? noop);

  const current = isControlled ? controlled : uncontrolled;

  const setCurrent: Dispatch<SetStateAction<T | undefined>> = useCallback(
    (next) => {
      if (isControlled) {
        const resolved = isUpdater(next) ? next(controlled) : next;
        if (resolved !== controlled && resolved !== undefined) {
          // eslint-disable-next-line react-hooks/rules-of-hooks -- function created by useEffectEvent can only be called in useEffect
          stableOnChange(resolved);
        }
      } else {
        setUncontrolled(next);
      }
    },
    [isControlled, controlled, setUncontrolled],
  );

  return [current, setCurrent] as const;
}

function useUncontrolled<T>({
  initialValue,
  onChange,
}: Expand<Omit<UseControllableProps<T>, 'value'>>) {
  const [current, setCurrent] = useState<T | undefined>(initialValue);
  const prevRef = useRef(current);
  const stableOnChange = useEffectEvent(onChange ?? noop);

  useEffect(() => {
    if (prevRef.current !== current) {
      if (current !== undefined) {
        stableOnChange(current);
      }
      prevRef.current = current;
    }
  }, [current]);

  return [current, setCurrent] as const;
}

export { useControllable, useUncontrolled };
