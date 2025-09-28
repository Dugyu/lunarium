import { useEffect, useRef } from 'react';

/**
 * useRafClock
 *
 * Provides a monotonically increasing frame counter (`frameIdRef`)
 * and the last rAF timestamp (`tsRef`), updated once per animation frame.
 *
 * Useful for tagging logs or values to check if multiple updates
 * occurred within the same rendered frame.
 */
export function useRafClock() {
  const frameIdRef = useRef(0);
  const tsRef = useRef(0);

  useEffect(() => {
    let raf = 0;
    const tick = (ts: number) => {
      frameIdRef.current += 1;
      tsRef.current = ts;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return { frameIdRef, tsRef };
}
