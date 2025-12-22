import './inline-css-var.css';

function InlineCSSVar() {
  return (
    <view className='size-full bg-canvas flex flex-col justify-center items-center gap-[16px] px-[24px] py-[72px]'>
      <text className='absolute top-[72px] text-content text-xl'>
        Inline CSS Vars (Static)
      </text>

      <view className='size-full flex flex-row justify-center items-center gap-[4px]'>
        <view className='parent bg-neutral-ambient w-[30%] h-[540px] flex flex-col justify-center items-center py-[48px] gap-[8px]'>
          <text className='absolute top-[16px] text-content text-xl'>
            Local Reference (Nested)
          </text>
          <view
            className='w-[48px] h-[360px] gradient-test flex flex-row justify-center items-center'
            style={{
              // @ts-expect-error custom properties
              '--my-gradient': 'var(--gradient-a)',
              backgroundImage:
                'linear-gradient(0deg, var(--gradient-c), var(--my-gradient))',
            }}
          >
            <view
              className='bg-[var(--my-gradient)] size-[20px]'
              // @ts-expect-error custom properties
              style={{ '--my-gradient': '#ff0000' }}
            >
            </view>
          </view>
        </view>
        <view className='parent bg-neutral-ambient w-[30%] h-[540px] flex flex-col justify-center items-center py-[48px] gap-[8px]'>
          <text className='absolute top-[16px] text-content text-xl'>
            Local Declaration
          </text>
          <view
            className='w-[48px] h-[360px] gradient-test'
            style={{
              // @ts-expect-error custom properties
              '--gradient-b': '#ff3682',
              '--gradient-c': '#b4d8ff',
            }}
          >
          </view>
        </view>

        <view className='parent bg-neutral-ambient w-[30%] h-[540px] flex flex-col justify-center items-center py-[48px] gap-[8px]'>
          <text className='absolute top-[16px] text-content text-xl'>
            Global
          </text>
          <view className='w-[48px] h-[360px] gradient-test'>
          </view>
        </view>
      </view>
    </view>
  );
}

export { InlineCSSVar };
