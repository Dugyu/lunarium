import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    entry: {
      index: ['src/**', '!src/**/*.test.*', '!src/**/__tests__/**'],
    },
    tsconfigPath: './tsconfig.build.json',
  },
  lib: [
    {
      bundle: false,
      format: 'esm',
      syntax: 'es2020',
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
