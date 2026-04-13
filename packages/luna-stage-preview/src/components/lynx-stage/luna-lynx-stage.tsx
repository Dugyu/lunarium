// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

// NOTE: CSS side-effect imports (@lynx-js/web-core, @lynx-js/web-elements)
// are intentionally NOT included here. Consuming apps must import them:
//   import '@lynx-js/web-core/index.css';
//   import '@lynx-js/web-elements/index.css';
//   import '@lynx-js/web-core';
//   import '@lynx-js/web-elements/all';

import type { LynxView } from '@lynx-js/web-core';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { JSX } from 'react';

import type { StudioViewMode } from '@dugyu/luna-catalog';
import type { LunaThemeKey, LunaThemeVariant } from '@dugyu/luna-core';

import { useIsomorphicLayoutEffect } from '../../hooks/use-isomorphic-layout-effect.js';
import type { MoonriseEvent } from '../../types/stage.js';

type LunaLynxStageProps = {
  entry: string;
  lunaTheme?: LunaThemeKey;
  lunaThemeVariant?: LunaThemeVariant;
  studioViewMode: StudioViewMode;
  /** Currently focused component ID (string, not tied to a specific registry). */
  focusedComponent: string;
  onFocusedChange?: (name: string) => void;
  onMoonriseChange?: (event: MoonriseEvent) => void;
  componentEntry?: string;
  /**
   * Base URL for Lynx bundle files.
   * Bundles are loaded from `${bundleBaseUrl}${entry}.web.bundle`.
   * @default '/'
   */
  bundleBaseUrl?: string;
};

/**
 * SSR-safe wrapper: renders nothing until mounted on the client.
 * This avoids crashes from useLayoutEffect and <lynx-view> in SSG/SSR environments.
 */
function LunaLynxStage(props: LunaLynxStageProps): JSX.Element | null {
  const [mounted, setMounted] = useState(false);
  useIsomorphicLayoutEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <LunaLynxStageImpl {...props} />;
}

function LunaLynxStageImpl(
  {
    entry,
    lunaTheme = 'luna-light',
    lunaThemeVariant = 'luna',
    studioViewMode,
    focusedComponent,
    onFocusedChange,
    onMoonriseChange,
    componentEntry,
    bundleBaseUrl = '/',
  }: LunaLynxStageProps,
) {
  const ref = useRef<LynxView | null>(null);

  useEffect(() => {
    ref.current!.onNativeModulesCall = (
      name,
      data,
      moduleName,
    ) => {
      if (moduleName === 'bridge') {
        if (name === 'setFocusedComponent') {
          const component: string = (data as { id: string }).id;
          onFocusedChange?.(component);
          return { entry, focusedComponent: component };
        } else if (name === 'setMoonriseState') {
          onMoonriseChange?.(data as MoonriseEvent);
          return { entry, moonriseEvent: data as MoonriseEvent };
        }
      }
    };
  }, [entry, onFocusedChange, onMoonriseChange]);

  useLayoutEffect(() => {
    ref.current!.url = `${bundleBaseUrl}${entry}.web.bundle`;
    ref.current!.style.width = '100%';
    ref.current!.style.height = '100%';
    ref.current!.style.pointerEvents = 'all';
  }, [entry, bundleBaseUrl]);

  useLayoutEffect(() => {
    ref.current!.updateGlobalProps({
      lunaTheme,
      studioViewMode,
      focusedComponent,
      componentEntry,
      lunaThemeVariant,
    });
  }, [
    lunaTheme,
    studioViewMode,
    focusedComponent,
    componentEntry,
    lunaThemeVariant,
  ]);

  return (
    <lynx-view
      lynx-group-id={7}
      ref={ref}
    >
    </lynx-view>
  );
}

export { LunaLynxStage };
export type { LunaLynxStageProps };
