import { useMemo } from '@lynx-js/react';
import type { ReactNode } from '@lynx-js/react';

import { RadioGroupContext } from './radio-group-context.js';
import type { RadioGroupContextValue } from './radio-group-context.js';

type RadioGroupProviderProps = RadioGroupContextValue & {
  children?: ReactNode;
};

export function RadioGroupProvider({
  selectedValue,
  handleValueChange,
  children,
}: RadioGroupProviderProps) {
  const value: RadioGroupContextValue = useMemo(() => ({
    selectedValue,
    handleValueChange,
  }), [
    selectedValue,
    handleValueChange,
  ]);

  return (
    <RadioGroupContext.Provider value={value}>
      {children}
    </RadioGroupContext.Provider>
  );
}
