import { useEffect, useMemo, useRef } from 'react';

/**
 * useEffectEvent
 *
 * Community Implementation of React's upcoming useEffectEvent hook
 * Provides a stable callback reference that always calls the latest `fn`,
 * avoiding stale closures while keeping identity stable across renders.
 * See: https://react.dev/reference/react/experimental_useEffectEvent
 *
 * - Internally stores the latest `fn` in a ref, updated via useEffect.
 * - Returns a memoized proxy function that delegates calls to `ref.current`.
 * - Useful when extracting a non-reactive function dependency out of the reactive Effect around it.
 *
 * @param fn The callback function to be stabilized.
 * @returns A stable function that always invokes the latest `fn`.
 */
function useEffectEvent<TArgs extends unknown[]>(
  fn: ((...args: TArgs) => void) | undefined,
): (...args: TArgs) => void;

function useEffectEvent<TArgs extends unknown[], TResult>(
  fn: ((...args: TArgs) => TResult) | undefined,
  options: { fallbackResult: TResult },
): (...args: TArgs) => TResult;

function useEffectEvent<TArgs extends unknown[], TResult>(
  fn: ((...args: TArgs) => TResult) | undefined,
  options?: { fallbackResult: TResult },
): (...args: TArgs) => TResult {
  const ref = useRef(fn);

  useEffect(() => {
    ref.current = fn;
  }, [fn]);

  // Stable proxy that delegates to the latest ref.
  // typed as F so calls are type-safe (no "unsafe call" rule).
  // useMemo is clearer here: to memoize a proxy function as a value,
  // not define an inline handler as with useCallback.
  return useMemo(() => {
    const proxy = (...args: TArgs) => {
      const f = ref.current;
      if (f) {
        return f(...args);
      }
      if (options) {
        return options.fallbackResult;
      }
      return undefined as unknown as TResult;
    };
    return proxy;
  }, [options]);
}

export { useEffectEvent };
