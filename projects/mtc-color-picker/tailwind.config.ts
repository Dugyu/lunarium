// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import preset from '@lynx-js/tailwind-preset';
import type { Config } from 'tailwindcss';

export default {
  // 'content' config will be replaced by pluginTailwindCSS,
  // retains here for correct typing
  content: [],
  presets: [preset],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: 'var(--color-base-1)',
          1: 'var(--color-base-1)',
          2: 'var(--color-base-2)',
          3: 'var(--color-base-3)',
          4: 'var(--color-base-4)',
          content: 'var(--color-base-content)',
        },
        content: 'var(--color-base-content)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          content: 'var(--color-primary-content)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          content: 'var(--color-secondary-content)',
        },
        muted: {
          DEFAULT: 'var(--color-muted)',
          content: 'var(--color-muted-content)',
        },
        neutral: {
          DEFAULT: 'var(--color-neutral)',
          content: 'var(--color-neutral-content)',
        },
      },
      borderRadius: {
        lg: '26px',
      },
    },
  },
  // other config keys...
} satisfies Config;
