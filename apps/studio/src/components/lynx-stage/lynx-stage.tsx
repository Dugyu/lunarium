import '@lynx-js/web-core/index.css';
import '@lynx-js/web-elements/index.css';
import '@lynx-js/web-core';
import '@lynx-js/web-elements/all';

import type { LynxView } from '@lynx-js/web-core';
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
