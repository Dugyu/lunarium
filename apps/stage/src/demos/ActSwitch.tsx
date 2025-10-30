import '@lynx-js/preact-devtools';
import '@lynx-js/react/debug';
import { root, useEffect } from '@lynx-js/react';

import { AppTheme } from '@/App.js';
import { ActSwitch } from '@/components/act-switch';

export function App() {
  useEffect(() => {
    console.log('Explorer theme:', lynx.__globalProps.theme);
    console.log('Explorer frontendTheme:', lynx.__globalProps.frontendTheme);
    console.log('Explorer preferredTheme:', lynx.__globalProps.preferredTheme);
    console.log('Final theme:', getTheme());
  }, []);

  return (
    <AppTheme
      preset={`luna-${getTheme()}`}
    >
      <ActSwitch />
    </AppTheme>
  );
}

root.render(<App />);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}

function getTheme(): 'light' | 'dark' {
  const theme =
    (lynx.__globalProps.preferredTheme ?? lynx.__globalProps.frontendTheme
      ?? lynx.__globalProps.theme) as
        | 'light'
        | 'dark';
  return (theme === 'dark') ? 'dark' : 'light';
}
