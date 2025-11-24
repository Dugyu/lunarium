import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import type { LynxUIComponentId, StudioViewMode } from '@/types';
import { cn } from '@/utils';

type ActBlueskiesProps = {
  studioViewMode: StudioViewMode;
  componentEntry: LynxUIComponentId;
};

function ActBlueskies(
  { studioViewMode, componentEntry }: ActBlueskiesProps,
) {
  return (
    <view className='absolute size-full flex flex-col justify-center items-center'>
      {componentEntry === 'switch' && (
        <view className='flex flex-col items-start gap-[24px] px-[84px]'>
          <view className='flex flex-col items-start gap-[10px]'>
            {/* Switch Demo Medium */}
            <view className='flex flex-row items-center justify-start gap-[10px]'>
              <Switch defaultChecked size='lg' />
              <text className='text-start text-base text-content-muted-1'>
                Illuminate
              </text>
            </view>
            <view className='flex flex-row items-center justify-start gap-[10px]'>
              <Switch size='lg' />
              <text className='text-start text-base text-content-muted-1'>
                In Play
              </text>
            </view>
          </view>
        </view>
      )}
      {componentEntry === 'checkbox'
        && (
          <view className='flex flex-col items-start gap-[24px] pt-[16px] overflow-hidden'>
            {/* Checkbox Demo Medium */}
            <view className='flex flex-col items-start gap-[10px]'>
              <view className='flex flex-row items-center gap-[10px]'>
                <Checkbox defaultChecked size='md' />
                <text className='text-base text-content-muted-1'>
                  awakened
                </text>
              </view>
              <view
                className={cn(
                  'flex flex-row items-center gap-[10px]',
                )}
              >
                <Checkbox size='md' />
                <text className='text-base text-content-muted-1'>
                  sleep
                </text>
              </view>
            </view>
            <view
              className={cn(
                'flex flex-col items-start gap-[10px] transition-transform duration-300 ease-in-out',
                studioViewMode === 'lineup' && 'transform-[translateX(-60vw)]',
              )}
            >
              {/* Checkbox Demo Small */}
              <view className='flex flex-row items-center gap-[10px]'>
                <Checkbox defaultChecked />
                <text className='text-p2 text-content-muted-1'>
                  awakened
                </text>
              </view>
              <view
                className={cn(
                  'flex flex-row items-center gap-[10px]',
                )}
              >
                <Checkbox />
                <text className='text-p2 text-content-muted-1'>
                  sleep
                </text>
              </view>
            </view>
          </view>
        )}
      {componentEntry === 'radio-group'
        && (
          <view className='flex flex-col justify-center items-start gap-[24px] pt-[16px]'>
            <RadioGroup
              className='flex flex-col items-start gap-[16px]'
              defaultValue='sink'
            >
              {/* Radio Group Demo Medium */}
              <view className='flex flex-row items-center gap-[10px]'>
                <RadioItem value='drift' size='md' />
                <text className='text-start text-lg text-content-muted-1 font-medium'>
                  Drift
                </text>
              </view>
              <view className='flex flex-row items-center gap-[10px]'>
                <RadioItem value='sink' size='md' />
                <text className='text-start text-lg  text-content-muted-1 font-medium'>
                  Sink
                </text>
              </view>
              <view className='flex flex-row items-center gap-[10px]'>
                <RadioItem value='wake' size='md' />
                <text className='text-start text-lg text-content-muted-1 font-medium'>
                  Wake
                </text>
              </view>
            </RadioGroup>
            <RadioGroup
              className={cn(
                'flex flex-col items-start gap-[16px] transition-transform duration-300 ease-in-out',
                studioViewMode === 'lineup' && 'transform-[translateX(-60vw)]',
              )}
              defaultValue='sink'
            >
              {/* Radio Group Demo Small */}
              <view className='flex flex-row items-center gap-[10px]'>
                <RadioItem value='drift' />
                <text className='text-start text-base text-content-muted-1 font-medium'>
                  Drift
                </text>
              </view>
              <view className='flex flex-row items-center gap-[10px]'>
                <RadioItem value='sink' />
                <text className='text-start text-base  text-content-muted-1 font-medium'>
                  Sink
                </text>
              </view>
              <view className='flex flex-row items-center gap-[10px]'>
                <RadioItem value='wake' />
                <text className='text-start text-base text-content-muted-1 font-medium'>
                  Wake
                </text>
              </view>
            </RadioGroup>
          </view>
        )}
    </view>
  );
}

export { ActBlueskies };
export type { ActBlueskiesProps };
