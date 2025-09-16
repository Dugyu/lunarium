import { useMemo } from 'react';
import type { Ref } from 'react';

type PossibleRef<T> = Ref<T> | undefined;

function setRef<T>(
  ref: PossibleRef<T>,
  value: T,
): void {
  if (typeof ref === 'function') {
    ref(value);
  } else if (
    ref !== undefined && ref !== null && typeof ref === 'object'
    && 'current' in ref
  ) {
    (ref as React.MutableRefObject<T | null>).current = value;
  }
}

function mergeRefs<T>(...refs: PossibleRef<T>[]) {
  return (node: T | null) => {
    refs.forEach(ref => {
      setRef(ref, node);
    });
  };
}

export function useMergedRefs<T>(...refs: PossibleRef<T>[]) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => mergeRefs(...refs), refs);
}
