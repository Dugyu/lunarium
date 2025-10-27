import { useState } from '@lynx-js/react';

import { cn } from '@/utils';

type CheckboxProps = {
  size?: 'sm' | 'md';
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
};

function Checkbox({ defaultChecked, size = 'sm', disabled }: CheckboxProps) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <view
      className={cn(
        'border-neutral-2 border-[1.5px] ui-checked:bg-primary rounded-[4px] ui-disabled:opacity-40',
        size === 'sm' ? 'size-[16px]' : 'size-[20px]',
        checked && 'ui-checked',
        disabled && 'ui-disabled',
      )}
      bindtap={() => setChecked(prev => !prev)}
      event-through={false}
    >
      {/* Indicator */}
      <view
        className={'size-full flex justify-center items-center'}
      >
        <view
          className={cn(
            'bg-primary-content rounded-full',
            size === 'sm' ? 'size-[6px]' : 'size-[8px]',
          )}
        >
        </view>
      </view>
    </view>
  );
}

export { Checkbox };
