import { useLunaColor } from '@dugyu/luna-reactlynx';

import { Button } from './Button.js';

export function Demo() {
  const color = useLunaColor();

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
        backgroundColor: color('canvas'),
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
