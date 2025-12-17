import '@lynx-js/preact-devtools';
import '@lynx-js/react/debug';
import { root } from '@lynx-js/react';

import { ActCheckbox } from '@/components/act-checkbox';
import { LunaTheme } from '@/LunaTheme.js';

export function App() {
  return (
    <LunaTheme>
      <ActCheckbox />
    </LunaTheme>
  );
}

root.render(<App />);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
