import '@lynx-js/preact-devtools';
import '@lynx-js/react/debug';
import { root } from '@lynx-js/react';

import { AppTheme } from '@/App.js';
import { ActMoonrise } from '@/components/act-moonrise';

export function App() {
  return (
    <AppTheme preset={lynx.__globalProps.lunaTheme ?? 'luna-light'}>
      <ActMoonrise
        studioViewMode={lynx.__globalProps.studioViewMode ?? 'compare'}
        lunaVariant={lynx.__globalProps.lunaThemeVariant ?? 'luna'}
      />
    </AppTheme>
  );
}

root.render(<App />);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
