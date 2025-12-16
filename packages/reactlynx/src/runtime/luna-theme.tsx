import { useMemo } from '@lynx-js/react';
import type { ReactNode } from '@lynx-js/react';
import type { CSSProperties } from '@lynx-js/types';

import type { LunaCustomThemeKey, LunaThemeKey } from '@dugyu/luna-core';
import { resolveThemeFromList } from '@dugyu/luna-core';

type LunaThemeProps = {
  children?: ReactNode;
  themes?: readonly LunaCustomThemeKey[];
  themeKey?: LunaCustomThemeKey;
  as?: 'view' | 'page';
  className?: string;
  style?: CSSProperties;
};

const DEFAULT_THEMES: LunaThemeKey[] = [
  'lunaris-dark',
  'lunaris-light',
  'luna-dark',
  'luna-light',
];

const DEFAULT_VIEW_STYLE: CSSProperties = { width: '100%', height: '100%' };

const EMPTY_STYLE = {};

export function LunaTheme(
  {
    children,
    themes = DEFAULT_THEMES,
    themeKey,
    as = 'page',
    style = EMPTY_STYLE,
    className,
  }: LunaThemeProps,
) {
  const requested = themeKey ?? lynx?.__globalProps?.lunaTheme;
  const resolved = resolveThemeFromList(themes, requested);

  const viewStyle = useMemo(
    () =>
      style !== EMPTY_STYLE
        ? { ...DEFAULT_VIEW_STYLE, ...style }
        : DEFAULT_VIEW_STYLE,
    [style],
  );

  const finalClassName = className ? `${resolved} ${className}` : resolved;

  return (as === 'page'
    ? <page className={finalClassName} style={style}>{children}</page>
    : (
      <view
        className={finalClassName}
        style={viewStyle}
      >
        {children}
      </view>
    ));
}
