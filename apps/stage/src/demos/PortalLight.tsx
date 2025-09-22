import '@lynx-js/preact-devtools';
import '@lynx-js/react/debug';
import { root } from '@lynx-js/react';

import { AppTheme } from '@/App.js';

export function App() {
  return (
    <AppTheme preset='luna-light'>
      <text className='text-2xl text-base-content'>L.U.N.A Stage</text>
    </AppTheme>
  );
}

root.render(<App />);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
