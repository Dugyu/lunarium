import { defineConfig } from '@rslib/core';

import {
  lunaDarkTokens,
  lunaLightTokens,
  lunarisDarkTokens,
  lunarisLightTokens,
} from '@dugyu/luna-tokens';
import { generateLunaCssPlugin } from './scripts/generateCss.js';

export default defineConfig({
  lib: [
    {
      format: 'esm',
      syntax: ['node 18'],
      dts: false,
    },
  ],
  plugins: [
    generateLunaCssPlugin([
      lunaDarkTokens,
      lunaLightTokens,
      lunarisDarkTokens,
      lunarisLightTokens,
    ]),
  ],
});
