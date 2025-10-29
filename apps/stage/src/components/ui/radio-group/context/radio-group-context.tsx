import { createContext } from '@lynx-js/react';

type RadioGroupContextValue = {
  selectedValue: string | undefined;
  handleValueChange: (value: string) => void;
  disabled: boolean;
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export { RadioGroupContext };
export type { RadioGroupContextValue };
