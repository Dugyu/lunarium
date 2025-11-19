import '@lynx-js/preact-devtools';
import '@lynx-js/react/debug';
import { root } from '@lynx-js/react';

import { AppTheme } from '@/App.js';
import { ActButton } from '@/components/act-button';
import { LunaThemeProvider, createLunaTheme } from '@dugyu/luna-reactlynx';
import { lunarisDarkTokens, lunarisLightTokens } from '@dugyu/luna-tokens';

const lunaLightTheme = createLunaTheme(lunarisLightTokens);
const lunaDarkTheme = createLunaTheme(lunarisDarkTokens);

const themes = [lunaLightTheme, lunaDarkTheme];

export function App() {
  return (
    <AppTheme preset='luna-light'>
      <LunaThemeProvider themes={themes} themeKey={'lunaris-dark'}>
        <ActButton />
      </LunaThemeProvider>
    </AppTheme>
  );
}

root.render(<App />);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
