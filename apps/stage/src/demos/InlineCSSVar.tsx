import '@lynx-js/preact-devtools';
import '@lynx-js/react/debug';
import { root } from '@lynx-js/react';

import { InlineCSSVar } from '@/components/css-var/inline-css-var.js';
import { LunaTheme } from '@/LunaTheme.js';

export function App() {
  return (
    <LunaTheme>
      <InlineCSSVar />
    </LunaTheme>
  );
}

root.render(<App />);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
