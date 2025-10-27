export const LYNX_UI_COMPONENTS = [
  'Button',
  'Checkbox',
  'Dialog',
  'Input',
  'Popover',
  'Radio Group',
  'Sheet',
  'Slider',
  'Switch',
  'Textarea',
  'Tooltip',
  'Toast',
] as const;

export type LynxUIComponentName = typeof LYNX_UI_COMPONENTS[number];
