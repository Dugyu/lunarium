import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginTailwindCSS } from 'rsbuild-plugin-tailwindcss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [pluginReact(), pluginTailwindCSS({ config: 'tailwind.config.ts' })],

  html: {
    title: 'L.U.N.A Studio',
  },
  dev: {
    client: {
      overlay: false,
    },
    writeToDisk: false,
  },
  server: {
    publicDir: [
      {
        name: path.join(__dirname, '../', 'stage', 'dist'),
        watch: true,
        copyOnBuild: true,
      },
      {
        name: 'public',
        watch: true,
        copyOnBuild: true,
      },
    ],
  },
});
