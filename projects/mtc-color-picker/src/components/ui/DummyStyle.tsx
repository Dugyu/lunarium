// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

function DummyStyle() {
  return (
    <view className='hidden'>
      <view className='relative flex-row items-center bg-primary px-5'>
        <view className='absolute bg-secondary h-10'></view>
        <view className='absolute bg-white size-8 -translate-x-1/2 shadow-md'>
        </view>
      </view>
    </view>
  );
}

export { DummyStyle };
