import '@lynx-js/web-core/index.css';
import '@lynx-js/web-elements/index.css';
import '@lynx-js/web-core';
import '@lynx-js/web-elements/all';

import type { LynxView } from '@lynx-js/web-core';
import { useLayoutEffect, useRef } from 'react';

type LunaLynxStageProps = {
  entry: string;
  lunaTheme: 'luna-light' | 'luna-dark';
  studioViewMode: 'compare' | 'focus' | 'lineup';
};

function LunaLynxStage(
  { entry, lunaTheme, studioViewMode }: LunaLynxStageProps,
) {
  const ref = useRef<LynxView | null>(null);
  // const [innerTheme, setInnerTheme] = useState(lunaTheme);

  /*   useEffect(() => {
    ref.current!.onNativeModulesCall = (
      name,
      data: { theme: 'light' | 'dark' },
      moduleName,
    ) => {
      if (moduleName === 'bridge' && name === 'changeTheme') {
        setInnerTheme(`luna-${data.theme}`);
        return { entry, data };
      }
    };
  }, [entry]); */

  useLayoutEffect(() => {
    ref.current!.url = `/${entry}.web.bundle`;
    ref.current!.style.width = '100%';
    ref.current!.style.height = '100%';
    ref.current!.style.pointerEvents = 'all';
  }, [entry]);

  useLayoutEffect(() => {
    ref.current!.updateGlobalProps({ lunaTheme, studioViewMode });
  }, [lunaTheme, studioViewMode]);

  return (
    <lynx-view
      lynx-group-id={7}
      ref={ref}
    >
    </lynx-view>
  );
}

export { LunaLynxStage };
