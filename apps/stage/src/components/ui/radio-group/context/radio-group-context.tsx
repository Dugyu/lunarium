import { createContext } from '@lynx-js/react';

type RadioGroupContextValue = {
  selectedValue: string | undefined;
  handleValueChange: (value: string) => void;
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export { RadioGroupContext };
export type { RadioGroupContextValue };
