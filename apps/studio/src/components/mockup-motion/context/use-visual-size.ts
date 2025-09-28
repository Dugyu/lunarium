import { useContext } from 'react';

import { VisualSizeContext } from './visual-size-context.tsx';

export function useVisualSize() {
  const ctx = useContext(VisualSizeContext);
  if (!ctx) {
    throw new Error('useVisualSize must be used within VisualSizeProvider');
  }
  return ctx;
}
