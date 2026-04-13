// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { root, useState } from '@lynx-js/react';

import { AppLayout } from '@/App';
import { ColorPicker } from '@/components/mtc/MTCColorPickerBTC';
import { DummyStyle } from '@/components/ui/DummyStyle';
import type { HSL } from '@/types/color';
import { sleep } from '@/utils/sleep';

if (__BACKGROUND__) {
  setInterval(() => {
    sleep(250);
  }, 100);
}

export function App() {
  const [value, setValue] = useState<HSL>(() => [199, 99, 72]);

  const handleChange = (v: HSL) => {
    'background';
    setValue(v);
  };

  return (
    <AppLayout
      title='MTC-State ColorPicker '
      subtitle='with a BTC Child'
      h={value[0]}
      s={value[1]}
      l={value[2]}
    >
      <DummyStyle />
      <view className='w-60 h-60'>
        <ColorPicker initialValue={value} onChange={handleChange}>
          <Tooltip content={`${value.join(', ')}`} />
        </ColorPicker>
      </view>
    </AppLayout>
  );
}

function Tooltip({ content }: { content: string }) {
  return <text className='text-content'>{content}</text>;
}

root.render(<App />);
