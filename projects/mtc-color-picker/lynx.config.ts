// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { pluginQRCode } from '@lynx-js/qrcode-rsbuild-plugin';
import { pluginReactLynx } from '@lynx-js/react-rsbuild-plugin';
import { defineConfig } from '@lynx-js/rspeedy';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';
import { pluginTailwindCSS } from 'rsbuild-plugin-tailwindcss';

const blockingEnabled = process.env.LYNX_DEMO_BLOCKING_ENABLED === 'true';

export default defineConfig({
  source: {
    entry: {
      'MTCColorPicker-BTC': './src/demos/MTCColorPickerBTC.tsx',
      'MTCColorPicker-Signal': './src/demos/MTCColorPickerSignal.tsx',
      'MTCColorPicker-State': './src/demos/MTCColorPickerState.tsx',
      'BTCMTSColorPicker-MTSCoord': './src/demos/BTCMTSColorPicker.tsx',
      'BTCMTSColorPicker-BTSCoord': './src/demos/BTCBTCMTSColorPicker.tsx',
      'BTCMTSSlider': './src/demos/BTCMTSSlider.tsx',
      'BTCSlider': './src/demos/BTCSlider.tsx',
    },
    define: {
      __ENABLE_BACKGROUND_BLOCKING__: JSON.stringify(blockingEnabled),
    },
  },
  plugins: [
    pluginQRCode({
      schema(url) {
        // We use `?fullscreen=true` to open the page in LynxExplorer in full screen mode
        return `${url}?fullscreen=true`;
      },
    }),
    pluginTypeCheck(),
    pluginTailwindCSS({
      config: 'tailwind.config.ts',
    }),
    pluginReactLynx({
      enableCSSInheritance: true,
      enableParallelElement: false,
    }),
  ],
});
