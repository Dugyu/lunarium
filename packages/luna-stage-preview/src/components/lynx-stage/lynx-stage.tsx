// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

// NOTE: CSS side-effect imports (@lynx-js/web-core, @lynx-js/web-elements)
// are intentionally NOT included here. Consuming apps must import them.

import type { LynxView } from '@lynx-js/web-core';
import { useLayoutEffect, useRef, useState } from 'react';
import type { JSX } from 'react';

import { useIsomorphicLayoutEffect } from '../../hooks/use-isomorphic-layout-effect.js';

type LynxStageProps = {
  entry: string;
  /**
   * Base URL for Lynx bundle files.
   * @default '/'
   */
  bundleBaseUrl?: string;
};

/**
 * Minimal Lynx stage — loads a bundle into a <lynx-view> element.
 * SSR-safe: renders nothing until mounted on the client.
 */
function LynxStage(props: LynxStageProps): JSX.Element | null {
  const [mounted, setMounted] = useState(false);
  useIsomorphicLayoutEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <LynxStageImpl {...props} />;
}

function LynxStageImpl({ entry, bundleBaseUrl = '/' }: LynxStageProps) {
  const ref = useRef<LynxView | null>(null);

  useLayoutEffect(() => {
    ref.current!.url = `${bundleBaseUrl}${entry}.web.bundle`;
    ref.current!.style.width = '100%';
    ref.current!.style.height = '100%';
    ref.current!.style.pointerEvents = 'all';
  }, [entry, bundleBaseUrl]);

  return (
    <lynx-view
      lynx-group-id={7}
      ref={ref}
    >
    </lynx-view>
  );
}

export { LynxStage };
export type { LynxStageProps };
