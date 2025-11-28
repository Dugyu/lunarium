import plugin from 'tailwindcss/plugin.js';

import type { LunaTailwindPlugin } from './types.js';

const lunaGradientPlugin: LunaTailwindPlugin = plugin(function(api) {
  const addComponents = (...args: Parameters<typeof api.addComponents>) =>
    api.addComponents(...args);

  const theme = (...args: Parameters<typeof api.theme>) => api.theme(...args);

  addComponents({
    '.luna-gradient': {
      background: `linear-gradient(
        160deg,
        ${theme('colors.gradient.a') as string},
        ${theme('colors.gradient.b') as string},
        ${theme('colors.gradient.c') as string},
        ${theme('colors.gradient.d') as string}
      )`,
    },
  });
  addComponents({
    '.luna-gradient-rose': {
      background: `linear-gradient(
        0deg,
        ${theme('colors.gradient.a') as string},
        ${theme('colors.gradient.b') as string}
      )`,
    },
  });
  addComponents({
    '.luna-gradient-berry': {
      background: `linear-gradient(
        0deg,
        ${theme('colors.gradient.b') as string},
        ${theme('colors.gradient.c') as string}
      )`,
    },
  });
  addComponents({
    '.luna-gradient-ocean': {
      background: `linear-gradient(
        0deg,
        ${theme('colors.gradient.c') as string} 60%,
        ${theme('colors.gradient.d') as string} 120%
      )`,
    },
  });
});

export { lunaGradientPlugin };
