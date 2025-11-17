export type {
  LunaNeutralThemeKey,
  LunaThemeKey,
  LunaThemeMode,
  LunaThemeVariant,
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
