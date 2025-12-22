import '@lynx-js/preact-devtools';
import '@lynx-js/react/debug';
import { root, useState } from '@lynx-js/react';

import { InlineCSSVar } from '@/components/css-var/inline-css-var.js';
import { LunaTheme } from '@/LunaTheme.js';

export function App() {
  const [light, setLight] = useState(false);

  const handleClick = () => {
    setLight(prev => !prev);
    console.log(light);
  };

  return (
    <LunaTheme themeKey={light === true ? 'lunaris-light' : 'lunaris-dark'}>
      <view className='size-full' bindtap={handleClick}>
        <InlineCSSVar />
      </view>
    </LunaTheme>
  );
}

root.render(<App />);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
