// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import type { ComponentProps } from '@lynx-js/react';
import type { CSSProperties } from '@lynx-js/types';

type MaskIconProps = {
  style?: CSSProperties;
  /**
   * The URL of the icon image (typically a white PNG with transparent background).
   * Example: "/assets/icons/icon-white.png"
   */
  iconUrl: string;
} & Omit<ComponentProps<'view'>, 'style'>;

export function MaskIcon({ iconUrl, style, ...otherProps }: MaskIconProps) {
  return (
    <view
      style={{
        maskImage: `url(${iconUrl})`,
        maskRepeat: 'no-repeat',
        maskSize: 'contain',
        maskPosition: 'center',
        ...style,
      }}
      {...otherProps}
    />
  );
}
