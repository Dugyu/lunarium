import { useEffect, useLayoutEffect } from 'react';

const isServer = typeof window === 'undefined'
  || typeof document === 'undefined';

const useIsomorphicLayoutEffect = isServer ? useLayoutEffect : useEffect;

export { useIsomorphicLayoutEffect };
