import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { pluginQRCode } from '@lynx-js/qrcode-rsbuild-plugin';
import { pluginReactLynx } from '@lynx-js/react-rsbuild-plugin';
import { defineConfig } from '@lynx-js/rspeedy';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';
import { pluginTailwindCSS } from 'rsbuild-plugin-tailwindcss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  source: {
    entry: {
      ActSwitch: './src/demos/ActSwitch.tsx',
      ActBlueskies: './src/demos/ActBlueskies.tsx',
      ActMoonrise: './src/demos/ActMoonrise.tsx',
      ActBloom: './src/demos/ActBloom.tsx',
      ActOneDark: './src/demos/ActOneDark.tsx',
      ActOneLight: './src/demos/ActOneLight.tsx',
      ActTwoDark: './src/demos/ActTwoDark.tsx',
      ActTwoLight: './src/demos/ActTwoLight.tsx',
    },
  },
  plugins: [
    pluginQRCode({
      schema(url) {
        // We use `?fullscreen=true` to open the page in LynxExplorer in full screen mode
        return `${url}?bar_color=fe69a1&title=Switch&title_color=fefefe&back_button_style=dark`;
      },
    }),
    pluginReactLynx({
      enableCSSInheritance: false,
    }),
    pluginTypeCheck(),
    pluginTailwindCSS({ config: 'tailwind.config.ts' }),
  ],
  environments: {
    web: {
      source: {
        define: {
          __WEB__: 'true',
        },
      },
      output: {
        assetPrefix: '/',
      },
    },
    lynx: {
      source: {
        define: {
          __WEB__: 'false',
        },
      },
    },
  },
});
