import type { LynxUIComponents } from '@/constants';

export type ComponentName = typeof LynxUIComponents[number]['name'];

export type ComponentMeta = {
  name: ComponentName;
  demoReady: boolean;
};
