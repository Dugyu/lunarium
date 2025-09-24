import '@lynx-js/web-core/index.css';
import '@lynx-js/web-elements/index.css';
import '@lynx-js/web-core';
import '@lynx-js/web-elements/all';
import type { CSSProperties } from 'react';

type LynxStageProps = {
  entry: string;
  style?: CSSProperties;
};

function LynxStage({ entry, style }: LynxStageProps) {
  return (
    <lynx-view
      style={{
        width: '100%',
        height: '100%',
        pointerEvents: 'all',
        ...style,
      }}
      url={`/${entry}.web.bundle`}
    >
    </lynx-view>
  );
}

export { LynxStage };
