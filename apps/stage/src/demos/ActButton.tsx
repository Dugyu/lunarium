import '@lynx-js/preact-devtools';
import '@lynx-js/react/debug';
import { root } from '@lynx-js/react';

import { ActButton } from '@/components/act-button';
import { LunaTheme } from '@/LunaTheme.js';

export function App() {
  return (
    <LunaTheme variant='all'>
      <ActButton />
    </LunaTheme>
  );
}

root.render(<App />);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
