import '@lynx-js/preact-devtools';
import '@lynx-js/react/debug';
import { root } from '@lynx-js/react';

import { ActRadioGroup } from '@/components/act-radio-group';
import { LunaTheme } from '@/LunaTheme.js';

export function App() {
  return (
    <LunaTheme variant='all'>
      <ActRadioGroup />
    </LunaTheme>
  );
}

root.render(<App />);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
