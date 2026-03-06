// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import '@lynx-js/preact-devtools';
import '@lynx-js/react/debug';
import { root } from '@lynx-js/react';

import { AppTheme } from '@/App.js';
import { ActBlueSkies } from '@/components/act-blueskies';

export function App() {
  return (
    <AppTheme preset='luna-light'>
      <ActBlueSkies
        studioViewMode={lynx.__globalProps.studioViewMode ?? 'focus'}
        componentEntry={lynx.__globalProps.componentEntry ?? 'switch'}
      />
    </AppTheme>
  );
}

root.render(<App />);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
