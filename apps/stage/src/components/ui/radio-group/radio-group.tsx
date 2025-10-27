import { useRef, useState } from '@lynx-js/react';
import type { ReactNode } from '@lynx-js/react';

import { cn } from '@/utils';

import { RadioGroupProvider, useRadioGroup } from './context';

type RadioItemProps = {
  size?: 'sm' | 'md';
  disabled?: boolean;
  value: string;
  className?: string;
};

type RadioGroupProps = {
  className?: string;
  disabled?: boolean;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children?: ReactNode;
};

function RadioItem(
  { disabled, value, size = 'sm', className }: RadioItemProps,
) {
  const { selectedValue, handleValueChange } = useRadioGroup();

  const handleChange = () => {
    if (disabled) return;
    handleValueChange(value);
  };

  return (
    <view
      className={cn(
        'border-neutral-2 rounded-full border-[1.5px] ui-checked:border-none ui-checked:bg-primary ui-disabled:opacity-40',
        size === 'sm' ? 'size-[16px]' : 'size-[22px]',
        disabled && 'ui-disabled',
        selectedValue === value && 'ui-checked',
        className,
      )}
      bindtap={handleChange}
    >
      {/* Indicator */}
      <view className={'size-full flex justify-center items-center'}>
        <view
          className={cn(
            'bg-primary-content rounded-full',
            size === 'sm' ? 'size-[6px]' : 'size-[9px]',
          )}
        >
        </view>
      </view>
    </view>
  );
}

function RadioGroup(
  { disabled, onValueChange, defaultValue, children, className }:
    RadioGroupProps,
) {
  const [value, setValue] = useState(defaultValue);

  const lastValue = useRef<string>();

  const handleValueChange = (value: string) => {
    if (disabled) return;
    if (lastValue.current !== value) {
      lastValue.current = value;
      setValue(value);
      onValueChange?.(value);
    }
  };

  return (
    <RadioGroupProvider
      handleValueChange={handleValueChange}
      selectedValue={value}
    >
      <view className={cn('grid gap-[10px]', className)}>
        {children}
      </view>
    </RadioGroupProvider>
  );
}

export { RadioGroup, RadioItem };
