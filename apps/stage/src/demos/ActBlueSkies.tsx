import '@lynx-js/preact-devtools';
import '@lynx-js/react/debug';
import { root } from '@lynx-js/react';

import { AppTheme } from '@/App.js';
import { ActBlueskies } from '@/components/act-blueskies';

export function App() {
  return (
    <AppTheme preset='luna-light'>
      <ActBlueskies
        studioViewMode={lynx.__globalProps.studioViewMode ?? 'focus'}
        componentEntry={lynx.__globalProps.componentEntry ?? 'Switch'}
      />
    </AppTheme>
  );
}

root.render(<App />);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
