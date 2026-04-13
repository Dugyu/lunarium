// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { defineConfig } from '@rslib/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [
    // Standard react-jsx transform (NOT runtime: 'preserve' which is for ReactLynx)
    pluginReact(),
  ],
  source: {
    tsconfigPath: './tsconfig.build.json',
  },
  lib: [
    {
      bundle: false,
      format: 'esm',
      syntax: 'es2020',
      dts: { tsgo: true },
      output: {
        filename: {
          js: '[name].js',
        },
        sourceMap: true,
      },
    },
  ],
});
