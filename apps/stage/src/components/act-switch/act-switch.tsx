// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import type { ReactNode } from '@lynx-js/react';
import { useState } from '@lynx-js/react';

import { Switch } from '@/components/ui/switch';

function Label({ children }: { children: ReactNode }) {
  return (
    <text className='text-start text-base text-content peer-ui-disabled:text-content-muted'>
      {children}
    </text>
  );
}

function ActSwitch() {
  const [disabled, setDisabled] = useState(true);

  return (
    <view className='size-full luna-gradient-berry flex flex-col justify-center items-center'>
      <view className='bg-canvas flex flex-col items-start gap-[12px] py-[128px] px-[84px] rounded-[36px]'>
        {/* Switch Demo Large */}
        <view className='flex flex-row items-center justify-start gap-[16px]'>
          <Switch
            defaultChecked
            size='lg'
            className='peer'
            disabled={disabled}
          />
          <Label>
            Illuminate
          </Label>
        </view>
        <view
          className={`flex flex-row items-center justify-start gap-[16px] ${
            disabled ? 'ui-disabled' : ''
          }`}
        >
          <Switch
            size='lg'
            onCheckedChange={(checked) => setDisabled(!checked)}
            className='parent-ui-disabled:opacity-10'
          />
          <text className='text-start text-base text-content parent-ui-disabled:text-content-muted'>
            In Play
          </text>
        </view>
      </view>
    </view>
  );
}

export { ActSwitch };
