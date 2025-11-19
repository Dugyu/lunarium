export type {
  LunaColorId,
  LunaColorKey,
  LunaNeutralThemeKey,
  LunaThemeKey,
  LunaThemeMode,
  LunaThemeVariant,
  LunaThemeTokens,
  LunaCustomThemeKey,
  LunaCustomThemeMeta,
  LunaCustomThemeMode,
  LunaCustomThemeTokens,
  LunaCustomThemeVariant,
} from './theme/index.js';

export {
  LUNA_COLOR_IDS,
  LUNA_COLOR_KEYS,
  colorIdToColorKey,
  colorKeyToColorId,
  createEmptyLunaColors,
} from './theme/index.js';

export type { StudioViewMode } from './studio.js';

// Re-export core component system (public API surface)
export {
  // --- Builders ---
  defineComponents,
  defineComponentsRaw,
  // --- Utils ---
  titleFromSlug,
} from './component/index.js';

// --- Types ---
export type {
  ComponentDef,
  ComponentDefInput,
  ExtractId,
  NormalizedItem,
  NormalizedTuple,
  ReadyOf,
  ReadyIdOf,
  Registry,
  RegistryIds,
  RegistryDef,
} from './component/index.js';
