import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    entry: {
      index: './src/index.ts',
    },
    tsconfigPath: './tsconfig.build.json',
  },
  lib: [
    {
      dts: { tsgo: true },
      format: 'esm',
    },
    {
      format: 'cjs',
    },
  ],
});
