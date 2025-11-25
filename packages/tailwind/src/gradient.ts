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
});

export { lunaGradientPlugin };
