import { Switch } from '@/components/ui/switch';

function ActSwitch() {
  return (
    <view className='size-full luna-gradient-berry flex flex-col justify-center items-center gap-[10px]'>
      <view className='bg-canvas flex flex-col items-start gap-[12px] py-[128px] px-[84px] rounded-[36px]'>
        {/* Switch Demo Large */}
        <view className='flex flex-row items-center justify-start gap-[16px]'>
          <Switch defaultChecked size='lg' />
          <text className='text-start text-base text-content'>
            Illuminate
          </text>
        </view>
        <view className='flex flex-row items-center justify-start gap-[16px]'>
          <Switch size='lg' />
          <text className='text-start text-base text-content'>
            In Play
          </text>
        </view>
      </view>
    </view>
  );
}

export { ActSwitch };
