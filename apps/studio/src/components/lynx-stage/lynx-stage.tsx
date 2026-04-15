// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import '@lynx-js/web-core/client';
import type { LynxViewElement as LynxView } from '@lynx-js/web-core/client';
import { useLayoutEffect, useRef } from 'react';

type LynxStageProps = {
  entry: string;
};

function LynxStage({ entry }: LynxStageProps) {
  const ref = useRef<LynxView | null>(null);

  useLayoutEffect(() => {
    ref.current!.url = `/${entry}.web.bundle`;
    ref.current!.style.width = '100%';
    ref.current!.style.height = '100%';
    ref.current!.style.pointerEvents = 'all';
  }, [entry]);

  return (
    <lynx-view
      lynx-group-id={7}
      ref={ref}
    >
    </lynx-view>
  );
}

export { LynxStage };
