import type { RegistryDef, RegistryIds } from '../index.js';
import { defineComponents } from '../index.js';

const components = [
  { id: 'button', demoReady: true },
  { id: 'input', demoReady: false },
] as const;

export const reg = defineComponents(components);

type Id = RegistryIds<typeof reg>; // "button" | "input"
type Def = RegistryDef<typeof reg>; // ComponentDef<"button", true> | ComponentDef<"input", false>
type Ids = typeof reg.ids; // readonly ["button", "input"]
type Ready = typeof reg.ready; //  readonly ComponentDef<"button", true>[]
type ReadyIds = typeof reg.readyIds; // readonly "button"[]

export type { Id, Def, Ids, Ready, ReadyIds };
