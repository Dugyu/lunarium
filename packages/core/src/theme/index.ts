export type LunaThemeVariant = 'luna' | 'lunaris';
export type LunaThemeMode = 'light' | 'dark';
export type LunaThemeKey = `${LunaThemeVariant}-${LunaThemeMode}`;
export type LunaNeutralThemeKey = `luna-${LunaThemeMode}`;

export const LUNA_COLOR_IDS = [
  'canvas',
  'canvas-ambient',
  'content',
  'content-2',
  'content-muted',
  'content-muted-2',
  'content-subtle',
  'content-faint',
  'paper',
  'paper-clear',
  'primary',
  'primary-2',
  'primary-muted',
  'primary-content',
  'neutral',
  'neutral-2',
  'neutral-subtle',
  'neutral-faint',
  'neutral-ambient',
  'neutral-content',
  'neutral-veil',
  'neutral-film',
  'line',
  'gradient-a',
  'gradient-b',
  'gradient-c',
  'gradient-d',
] as const;

export type LunaColorId = typeof LUNA_COLOR_IDS[number];

type CamelCase<S extends string> = S extends `${infer Head}-${infer Tail}`
  ? `${Head}${Capitalize<CamelCase<Tail>>}`
  : S;

/**
 * Runtime color keys exposed to components/hooks: camelCase.
 * Example:
 *   LunaColorId:  "primary-content"
 *   LunaColorKey: "primaryContent"
 */
export type LunaColorKey = CamelCase<LunaColorId>;

/**
 * "primary-content" -> "primaryContent"
 */
export function colorIdToColorKey(id: LunaColorId): LunaColorKey {
  return id
    .split('-')
    .map((seg, i) => i === 0 ? seg : seg.charAt(0).toUpperCase() + seg.slice(1))
    .join('') as LunaColorKey;
}

/**
 * "primaryContent" -> "primary-content"
 */
export function colorKeyToColorId(key: LunaColorKey): LunaColorId {
  return key.replace(/([A-Z])/g, '-$1').toLowerCase() as LunaColorId;
}

/** Precomputed list of all color keys in camelCase. */
export const LUNA_COLOR_KEYS: readonly LunaColorKey[] = LUNA_COLOR_IDS.map(id =>
  colorIdToColorKey(id)
) as readonly LunaColorKey[];

export const EMPTY_LUNA_COLORS = Object.freeze(
  Object.fromEntries(
    LUNA_COLOR_IDS.map(id => [colorIdToColorKey(id), '']),
  ) as Record<LunaColorKey, string>,
);

/** Factory: get a fresh mutable empty color map. */
export function createEmptyLunaColors(): Record<LunaColorKey, string> {
  return { ...EMPTY_LUNA_COLORS };
}

export type LunaCustomThemeKey = LunaThemeKey | (string & {});
export type LunaCustomThemeVariant = LunaThemeVariant | (string & {});
export type LunaCustomThemeMode = LunaThemeMode | (string & {});

/**
 * Official Luna theme tokens.
 */
export type LunaThemeTokens = {
  key: LunaThemeKey;
  variant: LunaThemeVariant;
  mode: LunaThemeMode;
  colors: Record<LunaColorId, string>;
};

/**
 * Custom theme meta: CSS-var-only or meta-based themes
 * that do not define concrete color values.
 */
export type LunaCustomThemeMeta = {
  key: LunaCustomThemeKey;
  variant: LunaCustomThemeVariant;
  mode: LunaCustomThemeMode;
};

/**
 * Custom theme tokens: user provided tokens
 * with custom `key`/`variant`/`mode` and actual color values.
 * Structure is similar to LunaThemeTokens, but not restricted
 * to the official `key`/`variant`/`mode` space.
 */
export type LunaCustomThemeTokens = {
  key: LunaCustomThemeKey; // allow custom keys
  variant: LunaCustomThemeVariant; // e.g. "cosmic"
  mode: LunaCustomThemeMode; // e.g. "night"
  colors: Record<LunaColorId, string>;
};
