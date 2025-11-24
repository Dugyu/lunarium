import '@lynx-js/preact-devtools';
import '@lynx-js/react/debug';
import { root, useEffect } from '@lynx-js/react';

import { AppTheme } from '@/App.js';
import { ActSwitch } from '@/components/act-switch';

export function App() {
  useEffect(() => {
    console.log('Explorer frontendTheme:', lynx.__globalProps.frontendTheme);
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
  const theme = (lynx.__globalProps.frontendTheme) as
    | 'light'
    | 'dark';
  return (theme === 'dark') ? 'dark' : 'light';
}
