import { useContext } from '@lynx-js/react';

import { RadioGroupContext } from './radio-group-context.js';

export function useRadioGroup() {
  const ctx = useContext(RadioGroupContext);
  if (!ctx) {
    throw new Error('useVisualSize must be used within VisualSizeProvider');
  }
  return ctx;
}
