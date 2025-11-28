import '@lynx-js/preact-devtools';
import '@lynx-js/react/debug';
import { root } from '@lynx-js/react';

import { ActSwitch } from '@/components/act-switch';
import { LunaTheme } from '@/LunaTheme.js';

export function App() {
  return (
    <LunaTheme variant='all'>
      <ActSwitch />
    </LunaTheme>
  );
}

root.render(<App />);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
