import '@lynx-js/preact-devtools';
import '@lynx-js/react/debug';
import { root } from '@lynx-js/react';

import { NestedCSSVar } from '@/components/css-var';
import { LunaTheme } from '@/LunaTheme.js';

export function App() {
  return (
    <LunaTheme>
      <NestedCSSVar />
    </LunaTheme>
  );
}

root.render(<App />);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
