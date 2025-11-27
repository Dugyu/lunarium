import '@lynx-js/preact-devtools';
import '@lynx-js/react/debug';
import { root } from '@lynx-js/react';

import { ActBloom } from '@/components/act-bloom';

import '../App.css';

export function App() {
  return (
    <ActBloom
      studioViewMode={lynx.__globalProps.studioViewMode ?? 'focus'}
      focusedComponent={lynx.__globalProps.focusedComponent ?? 'button'}
    />
  );
}

root.render(<App />);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
