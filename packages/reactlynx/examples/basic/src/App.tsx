import { LunaThemeProvider, createLunaTheme } from '@dugyu/luna-reactlynx';
import { lunarisDarkTokens, lunarisLightTokens } from '@dugyu/luna-tokens';

import { Demo } from './components/Demo.js';

const lunaLightTheme = createLunaTheme(lunarisLightTokens);
const lunaDarkTheme = createLunaTheme(lunarisDarkTokens);

const themes = [lunaLightTheme, lunaDarkTheme];

export function App() {
  return (
    <LunaThemeProvider themes={themes} themeKey={'luna-light'}>
      <Demo />
    </LunaThemeProvider>
  );
}
