import {
  LunaThemeProvider,
  createLunaTheme,
  useLunaColors,
} from '@dugyu/luna-reactlynx';
import { lunarisDarkTokens, lunarisLightTokens } from '@dugyu/luna-tokens';

import { Button } from './Button.js';

const lunaLightTheme = createLunaTheme(lunarisLightTokens);
const lunaDarkTheme = createLunaTheme(lunarisDarkTokens);

const themes = [lunaLightTheme, lunaDarkTheme];

export function App() {
  return (
    <LunaThemeProvider
      themes={themes}
      themeKey={lynx.__globalProps.lunaTheme ?? 'lunaris-light'}
    >
      <Demo />
    </LunaThemeProvider>
  );
}

function Demo() {
  const colors = useLunaColors();

  return (
    <view
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        rowGap: '8px',
        paddingLeft: '64px',
        paddingRight: '64px',
        backgroundColor: colors.canvas,
      }}
    >
      {/* Button Demo */}
      <Button>Let it bloom</Button>
      <Button variant='secondary'>
        Stay asleep
      </Button>
    </view>
  );
}
