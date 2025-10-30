import type { LunaThemeMode, LynxUIComponentName } from '@/types';

type ViewSpec = {
  id: string;
  className: string;
};

type StageMeta = {
  entry: string;
  theme: `luna-${LunaThemeMode}`;
  componentName?: LynxUIComponentName;
};

export type { ViewSpec, StageMeta };
