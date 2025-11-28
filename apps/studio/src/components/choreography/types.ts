import type { LunaThemeKey, LynxUIComponentId } from '@/types';

type ViewSpec = {
  id: string;
  className: string;
};

type StageMeta = {
  entry: string;
  theme: LunaThemeKey;
  componentId?: LynxUIComponentId;
} & Record<string, unknown>;

export type { ViewSpec, StageMeta };
