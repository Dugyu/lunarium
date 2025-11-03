import '@lynx-js/preact-devtools';
import '@lynx-js/react/debug';
import { root } from '@lynx-js/react';

import { AppTheme } from '@/App.js';
import { ActBloom } from '@/components/act-bloom';

export function App() {
  return (
    <AppTheme preset='luna-light'>
      <ActBloom
        studioViewMode={lynx.__globalProps.studioViewMode ?? 'focus'}
        focusedComponent={lynx.__globalProps.focusedComponent ?? 'button'}
      />
    </AppTheme>
  );
}

root.render(<App />);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
