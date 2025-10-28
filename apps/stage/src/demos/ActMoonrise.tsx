import '@lynx-js/preact-devtools';
import '@lynx-js/react/debug';
import { root, useState } from '@lynx-js/react';

import { AppTheme } from '@/App.js';
import { ActMoonrise } from '@/components/act-moonrise';

export function App() {
  const [theme, setTheme] = useState<'luna-light' | 'luna-dark'>('luna-light');

  return (
    <AppTheme preset={theme}>
      <ActMoonrise
        studioViewMode={lynx.__globalProps.studioViewMode ?? 'compare'}
        onClick={() =>
          setTheme(prev => prev === 'luna-dark' ? 'luna-light' : 'luna-dark')}
      />
    </AppTheme>
  );
}

root.render(<App />);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
