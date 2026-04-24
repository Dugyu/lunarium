import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  plugins: [
    pluginReact({ swcReactOptions: { runtime: 'preserve' } }),
  ],
  source: {
    entry: {
      index: ['src/**', '!src/**/*.test.*', '!src/**/__tests__/**'],
    },
    tsconfigPath: './tsconfig.build.json',
  },
  lib: [{
    bundle: false,
    format: 'esm',
    syntax: 'es6',
    output: {
      filename: { js: '[name].jsx' },
      sourceMap: true,
    },
    dts: { tsgo: true },
  }],
});
