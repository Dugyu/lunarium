import { defineConfig } from '@rslib/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [
    pluginReact({ swcReactOptions: { runtime: 'preserve' } }),
  ],
  source: {
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
