import { LunaTheme } from '@dugyu/luna-reactlynx/runtime';

import { Button } from './Button.js';

import './App.css';

export function App() {
  return (
    <LunaTheme>
      <view className='container'>
        {/* Button Demo */}
        <Button>Let it bloom</Button>
        <Button variant='secondary'>
          Stay asleep
        </Button>
      </view>
    </LunaTheme>
  );
}
