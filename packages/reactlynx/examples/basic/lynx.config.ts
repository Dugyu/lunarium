import { pluginQRCode } from '@lynx-js/qrcode-rsbuild-plugin';
import { pluginReactLynx } from '@lynx-js/react-rsbuild-plugin';
import { defineConfig } from '@lynx-js/rspeedy';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';

export default defineConfig({
  source: {
    entry: {
      'ThemeShell-Class-based': './src/ThemeShell/index.tsx',
      'ThemeProvider-JS-Tokens': './src/ThemeProvider/index.tsx',
    },
  },
  plugins: [
    pluginQRCode({
      schema(url) {
        // We use `?fullscreen=true` to open the page in LynxExplorer in full screen mode
        return `${url}?fullscreen=true&luna_theme=lunaris-light`;
      },
    }),
    pluginReactLynx(),
    pluginTypeCheck(),
  ],
});
