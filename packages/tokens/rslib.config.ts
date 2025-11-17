import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    entry: {
      index: './src/index.ts',
      'luna-light': './src/luna-light.ts',
      'luna-dark': './src/luna-dark.ts',
      'lunaris-light': './src/lunaris-light.ts',
      'lunaris-dark': './src/lunaris-dark.ts',
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
