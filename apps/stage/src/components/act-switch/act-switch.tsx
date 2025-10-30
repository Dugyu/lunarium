import { useCallback, useState } from '@lynx-js/react';
import { clsx } from 'clsx';

function ActSwitch() {
  const [checked, setChecked] = useState(true);

  const handleClick = useCallback(() => {
    setChecked(prev => {
      const next = !prev;
      NativeModules?.bridge?.call(
        'changeTheme',
        { theme: next ? 'light' : 'dark' },
        res => {
          console.log('changedTheme:', res);
        },
      );

      return !prev;
    });
  }, []);

  return (
    <view
      className='w-[64px] h-[32px] rounded-full overflow-hidden flex flex-row items-center ui-disabled:opacity-50'
      bindtap={handleClick}
    >
      {/* Track */}
      <view
        className={clsx(
          'size-full bg-[#959595] transition-all ui-checked:luna-gradient',
          checked && 'ui-checked',
        )}
      />
      {/* Thumb */}
      <view
        className={clsx(
          'absolute w-[24px] h-[24px] ui-active:w-[36px] rounded-full bg-[#f5f5f5] transform-[translateX(4px)] ui-checked:transform-[translateX(36px)] ui-checked:ui-active:transform-[translateX(24px)] transition-all shadow',
          checked && 'ui-checked',
        )}
      />
      <view />
    </view>
  );
}

export { ActSwitch };
