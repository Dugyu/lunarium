// ---------- Types (public, stable) ----------
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
} from './types.js';

// ---------- Constructors / Registry builders ----------
export {
  // Normalized by default; accepts string | ComponentDefInput | ComponentDef
  defineComponents,
  // Raw mode: exact-in/exact-out, no slugify/name defaults
  defineComponentsRaw,
} from './define.js';

// ---------- Utilities (public, handy in Studio/Stage) ----------
export {
  titleFromSlug, // "radio-group" -> "Radio Group"
} from './normalize.js';
