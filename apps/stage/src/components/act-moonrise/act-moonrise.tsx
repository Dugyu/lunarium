import { useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import type { LunaThemeVariant, StudioViewMode } from '@/types';
import { cn } from '@/utils';

type MoonriseEvent =
  | { field: 'luna-variant'; value: LunaThemeVariant }
  | {
    field: 'light-mode';
    value: boolean;
  }
  | { field: 'autoplay'; value: boolean }
  | { field: 'trust'; value: boolean }
  | { field: 'subscribe'; value: boolean };

type onMoonriseEvent = (e: MoonriseEvent) => void;

type ActMoonriseProps = {
  studioViewMode: StudioViewMode;
  lunaVariant: LunaThemeVariant;
};

function ActMoonrise(
  { studioViewMode, lunaVariant }: ActMoonriseProps,
) {
  const emit = useCallback<onMoonriseEvent>(
    ({ field, value }) => {
      NativeModules?.bridge?.call(
        'setMoonriseState',
        { field, value },
        res => {
          if (import.meta.env.DEV) {
            console.log('setMoonriseState:', res);
          }
        },
      );
    },
    [],
  );

  return (
    <view className='size-full flex flex-col justify-between items-center px-[16px] pt-[80px] pb-[48px] overflow-hidden'>
      <view
        className={cn(
          'w-full rounded-[16px] px-[20px] py-[32px] border border-neutral-2 flex flex-col items-start gap-[24px] transition-transform duration-500 ease-in-out',
          studioViewMode !== 'compare' && 'transform-[translateY(-100vh)]',
        )}
      >
        {/* Headline */}
        <view className='w-full flex flex-col items-start gap-[2px]'>
          <text className='text-start text-xl text-base-content font-semibold'>
            Awaken your interface
          </text>
          <text className='text-start text-p2 text-base-content-2'>
            Generate your first Lynx UI theme. Step into the night and let your
            interface bloom.
          </text>
        </view>
        {/* Theme: Choose from Neutral & Signature Gradient */}
        <view className='w-full flex flex-col items-start gap-[10px]'>
          <view className='w-full flex flex-col items-start gap-[2px]'>
            <text className='text-start text-base text-base-content font-medium'>
              Theme
            </text>
            <text className='text-start text-p2 text-base-content-2'>
              Select the theme that best fits your needs.
            </text>
          </view>
          {/* Radio Group Demo */}
          <RadioGroup
            className='w-full grid-cols-2 gap-[10px]'
            value={lunaVariant}
          >
            <view
              className={cn(
                'rounded-[10px] p-[10px] border border-neutral-2 flex flex-row gap-[8px]',
                lunaVariant === 'luna' && ' bg-neutral-4',
              )}
              bindtap={() => {
                emit({
                  field: 'luna-variant',
                  value: lunaVariant === 'luna' ? 'lunaris' : 'luna',
                });
              }}
            >
              <RadioItem value={'luna'} />
              <view className='flex-1 flex flex-col items-start pr-[4px] pb-[4px]'>
                <text className='text-start text-base text-base-content font-medium'>
                  LUNA
                </text>
                <text className='text-start text-xs text-base-content-2'>
                  Default neutral theme
                </text>
              </view>
            </view>
            <view
              className={cn(
                'rounded-[10px] p-[10px] border border-neutral-2 flex flex-row gap-[8px]',
                lunaVariant === 'lunaris' && ' bg-neutral-4',
              )}
              bindtap={() => {
                emit({
                  field: 'luna-variant',
                  value: lunaVariant === 'luna' ? 'lunaris' : 'luna',
                });
              }}
            >
              <RadioItem value={'lunaris'} />
              <view className='flex-1 flex flex-col items-start pr-[4px] pb-[4px]'>
                <text className='text-start text-base text-base-content font-medium'>
                  Lunaris
                </text>
                <text className='text-start text-xs text-base-content-2'>
                  Signature gradient theme
                </text>
              </view>
            </view>
          </RadioGroup>
        </view>
        {/* Moodline: Potential Prompt for AI Gen */}
        <view className='w-full flex flex-col items-start gap-[10px]'>
          <text className='text-start text-base text-base-content font-medium'>
            Moodline
          </text>
          {/* Reserved for TextArea Demo */}
          <view className='w-full h-[52px] rounded-[10px] p-[10px] border border-neutral-2'>
            <text className='text-start text-sm text-base-content-3'>
              Leave a trace of your dream
            </text>
          </view>
        </view>

        {/* Set the stage: App config */}
        <view className='w-full flex flex-col items-start gap-[18px]'>
          <view className='w-full flex flex-col items-start gap-[2px]'>
            <text className='text-start text-base text-base-content font-medium'>
              Set the stage
            </text>
            <text className='text-start text-p2 text-base-content-2'>
              Decide how you'll watch the next act unfold.
            </text>
          </view>
          <view className='w-full flex flex-col items-start gap-[10px]'>
            <view className='w-full flex flex-row items-center justify-between gap-[10px]'>
              <text className='text-start text-sm text-base-content-3'>
                Lights on
              </text>
              <Switch defaultChecked size='sm' />
            </view>
            <view className='w-full flex flex-row items-center justify-between gap-[10px]'>
              <text className='text-start text-sm text-base-content-3'>
                Play itself
              </text>
              <Switch size='sm' />
            </view>
          </view>
        </view>

        {/* Acknowledgements */}
        <view className='w-full flex flex-col items-start gap-[10px] pt-[16px]'>
          {/* Checkbox Demo */}
          <view className='flex flex-row items-center gap-[10px]'>
            <Checkbox />
            <text className='text-p2 text-base-content'>
              I trust the rhythm of light and code
            </text>
          </view>
          <view className='flex flex-row items-center gap-[10px]'>
            <Checkbox defaultChecked />
            <text className='text-p2 text-base-content'>
              Let Lynx UI send me gentle updates
            </text>
          </view>
        </view>
      </view>
      {/* CTA: Call-To-Action */}
      <view
        className={cn(
          'w-full py-[16px] transition-all duration-500 ease-in-out overflow-hidden',
          studioViewMode !== 'compare' && 'transform-[translateY(-33vh)]',
          studioViewMode === 'compare' ? 'px-[16px]' : 'px-[64px]',
        )}
      >
        {/* Button Demo */}
        <view className='flex flex-col justify-end items-center w-full gap-[8px]'>
          <Button size='lg'>Let it bloom</Button>
          <Button
            size='lg'
            variant='secondary'
            className={cn(
              'transition-all',
              studioViewMode === 'lineup' && 'transform-[translateY(60px)]',
            )}
          >
            Stay asleep
          </Button>
        </view>
      </view>
    </view>
  );
}

export { ActMoonrise };
export type { ActMoonriseProps };
