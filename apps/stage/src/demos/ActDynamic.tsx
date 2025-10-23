import '@lynx-js/preact-devtools';
import '@lynx-js/react/debug';
import { root } from '@lynx-js/react';

import { AppTheme } from '@/App.js';
import { ActDynamic } from '@/components/act-dynamic';

export function App() {
  return (
    <AppTheme preset='luna-light'>
      <ActDynamic
        studioViewMode={lynx.__globalProps.studioViewMode ?? 'compare'}
      />
    </AppTheme>
  );
}

root.render(<App />);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
