// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

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
