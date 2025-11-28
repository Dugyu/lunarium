import type { LunaThemeKey, LunaThemeMode } from '@/types';

type LunaThemeResolverConfig = {
  web?: LunaThemeKey[];
  lynx?: LunaThemeKey[];
};

type LunaThemeResolverOptions = {
  /** Optional manual default; falls back to themes[0] or 'luna-light' */
  defaultTheme?: LunaThemeKey;
};

/** Deduplicate but preserve original order */
function uniqPreserveOrder<T>(arr: T[] | undefined): T[] {
  return arr ? Array.from(new Set(arr)) : [];
}

/** Helper: get mode from a theme key */
function getThemeMode(key: LunaThemeKey): LunaThemeMode {
  return key.endsWith('dark') ? 'dark' : 'light';
}

/**
 * Create a theme resolver that knows Web vs Lynx allowed themes.
 */

export function createLunaThemeResolver(
  config: LunaThemeResolverConfig,
  options: LunaThemeResolverOptions = {},
) {
  const webAllowed = uniqPreserveOrder(config.web);
  const lynxAllowed = uniqPreserveOrder(config.lynx);

  function getAllowed(): LunaThemeKey[] {
    if (__WEB__) {
      // If web is not configured, fall back to lynx config.
      return webAllowed.length ? webAllowed : lynxAllowed;
    }
    // runtime === 'lynx'
    return lynxAllowed.length ? lynxAllowed : webAllowed;
  }

  function resolveTheme(
    requested: LunaThemeKey | undefined,
  ): LunaThemeKey {
    const allowed = getAllowed();

    // If nothing configured at all, use global default or a hardcoded one.
    if (allowed.length === 0) {
      return options.defaultTheme ?? 'luna-dark';
    }

    // Runtime-local default: first theme in this runtime's allowed list.
    const runtimeDefault =
      options.defaultTheme && allowed.includes(options.defaultTheme)
        ? options.defaultTheme
        : allowed[0];

    // 1. Exact match in current runtime's allowed themes.
    if (requested && allowed.includes(requested)) {
      return requested;
    }

    // 2. Same-mode fallback (light/dark) inside current runtime.
    if (requested) {
      const mode = getThemeMode(requested);
      const sameMode = allowed.find(theme => getThemeMode(theme) === mode);
      if (sameMode) return sameMode;
    }

    // 3. Final fallback for this runtime.
    return runtimeDefault;
  }
  return () => resolveTheme(lynx.__globalProps.lunaTheme);
}

export const lunaThemeResolver = createLunaThemeResolver(
  {
    web: ['luna-dark', 'luna-light'],
    lynx: ['lunaris-dark', 'lunaris-light', 'luna-dark', 'luna-light'],
  },
);

export const lunarisThemeResolver = createLunaThemeResolver(
  {
    web: ['lunaris-dark', 'lunaris-light'],
    lynx: ['lunaris-dark', 'lunaris-light', 'luna-dark', 'luna-light'],
  },
);

export const themeResolver = createLunaThemeResolver(
  {
    web: ['lunaris-dark', 'lunaris-light', 'luna-dark', 'luna-light'],
    lynx: ['lunaris-dark', 'lunaris-light', 'luna-dark', 'luna-light'],
  },
);
