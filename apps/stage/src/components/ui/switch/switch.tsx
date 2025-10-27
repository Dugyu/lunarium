import { useState } from '@lynx-js/react';

import { cn } from '@/utils';

type SwitchProps = {
  size?: 'sm' | 'lg';
  defaultChecked?: boolean;
  disabled?: boolean;
};

function Switch(
  { size = 'sm', defaultChecked, disabled = false }: SwitchProps,
) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <view
      className={cn(
        'rounded-full overflow-hidden flex flex-row items-center ui-disabled:opacity-50',
        size === 'sm' && 'w-[38px] h-[22px]',
        size === 'lg' && 'w-[48px] h-[28px]',
        disabled && 'ui-disabled',
      )}
      bindtap={() => setChecked(prev => !prev)}
    >
      {/* Track */}
      <view
        className={cn(
          'w-full h-full transition-all bg-neutral-3 ui-checked:bg-primary',
          checked && 'ui-checked',
        )}
      />
      {/* Thumb */}
      <view
        className={cn(
          'absolute rounded-full bg-primary-content transform-[translateX(3px)] transition-all shadow',
          checked && 'ui-checked',
          size === 'sm'
            && 'size-[16px] ui-active:w-[24px] ui-checked:transform-[translateX(19px)] ui-checked:ui-active:transform-[translateX(11px)]',
          size === 'lg'
            && 'size-[22px] ui-active:w-[33px] ui-checked:transform-[translateX(23px)] ui-checked:ui-active:transform-[translateX(12px)]',
        )}
      />
      <view />
    </view>
  );
}

export { Switch };
