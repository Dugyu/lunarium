import type { LunaThemeMode, LynxUIComponentId } from '@/types';

type ViewSpec = {
  id: string;
  className: string;
};

type StageMeta = {
  entry: string;
  theme: `luna-${LunaThemeMode}`;
  componentId?: LynxUIComponentId;
} & Record<string, unknown>;

export type { ViewSpec, StageMeta };
