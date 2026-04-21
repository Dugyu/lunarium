import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    tsconfigPath: './tsconfig.build.json',
  },
  lib: [
    {
      bundle: false,
      format: 'esm',
      syntax: 'esnext',
      dts: { tsgo: true },
      output: {
        target: 'web',
        sourceMap: true,
      },
    },
  ],
  plugins: [
    pluginReact(),
  ],
});
