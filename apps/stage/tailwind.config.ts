import LynxPreset from '@lynx-js/tailwind-preset';
import type { Config } from 'tailwindcss';

import { LunaPreset } from '@dugyu/luna-tailwind';

const config: Config = {
  // 'content' config will be replaced by pluginTailwindCSS,
  // retains here for correct typing
  content: [],
  presets: [LynxPreset, LunaPreset],
};

export default config;
