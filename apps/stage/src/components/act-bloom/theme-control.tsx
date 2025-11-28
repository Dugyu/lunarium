import { useState } from '@lynx-js/react';

import type { LunaThemeKey, LunaThemeMode, LunaThemeVariant } from '@/types';

import { parseLunaThemeKey } from './parse-theme.js';

type ThemeControlProps = {
  defaultTheme: LunaThemeKey;
  onThemeChange?: (key: LunaThemeKey) => void;
};

type LunaThemeObject = {
  variant: LunaThemeVariant;
  mode: LunaThemeMode;
};

function ThemeControl({ defaultTheme, onThemeChange }: ThemeControlProps) {
  // Use lazy initializer so parseLunaThemeKey is only called once.
  const [theme, setTheme] = useState(() => parseLunaThemeKey(defaultTheme));

  const { variant, mode } = theme;

  const emit = (next: { variant: LunaThemeVariant; mode: LunaThemeMode }) => {
    const key: LunaThemeKey = `${next.variant}-${next.mode}`;
    onThemeChange?.(key);
  };

  const toggleVariant = () => {
    setTheme(prev => {
      const next: LunaThemeObject = {
        ...prev,
        variant: prev.variant === 'luna' ? 'lunaris' : 'luna',
      };
      emit(next);
      return next;
    });
  };
  const toggleMode = () => {
    setTheme(prev => {
      const next: LunaThemeObject = {
        ...prev,
        mode: prev.mode === 'light' ? 'dark' : 'light',
      };
      emit(next);
      return next;
    });
  };

  return (
    <view className='w-full h-[48px] flex flex-row justify-end gap-[16px] items-center'>
      <view
        bindtap={toggleVariant}
        className='flex-1 border border-line rounded-[24px] px-[12px] py-[8px] flex flex-col items-center'
      >
        <text className='text-sm text-content-faint'>variant</text>
        <text className='font-semibold text-lg text-content'>
          {variant === 'luna' ? 'LUNA' : 'Lunaris'}
        </text>
      </view>
      <view
        bindtap={toggleMode}
        className='flex-1 border border-line rounded-[24px] px-[12px] py-[8px] flex flex-col items-center'
      >
        <text className='text-sm text-content-faint'>mode</text>
        <text className='font-semibold text-lg text-content'>
          {mode === 'dark' ? 'Dark' : 'Light'}
        </text>
      </view>
    </view>
  );
}

export { ThemeControl };
export type { ThemeControlProps };
