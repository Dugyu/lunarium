import headlessUIPlugin from '@headlessui/tailwindcss';
import type { Config } from 'tailwindcss';
import type { PluginCreator } from 'tailwindcss/types/config';

const config: Config = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx,mdx}'],
  plugins: [headlessUIPlugin as PluginCreator],
};
export default config;
