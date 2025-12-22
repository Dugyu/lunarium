import './nested-css-var.css';

function NestedCSSVar() {
  return (
    <view className='size-full bg-canvas flex flex-col justify-center items-center gap-[16px] px-[24px] py-[72px]'>
      <text className='absolute top-[72px] text-content text-xl'>
        Inline and Nested CSS Vars
      </text>

      <view className='size-full flex flex-row justify-center items-center'>
        <view className='parent bg-neutral-ambient w-1/2 h-[540px] flex flex-col justify-center items-center py-[48px] gap-[8px]'>
          <text className='absolute top-[16px] text-content text-xl'>
            Actual
          </text>
          <view className='child-1 size-[48px] border border-line' />
          <view className='child-2 size-[48px] border border-line' />
          <view className='child-3 size-[48px] border border-line' />
          <view className='child-4 size-[48px] border border-line' />
          <view className='child-5 size-[48px] border border-line' />
        </view>

        <view className='parent-reference bg-neutral-ambient w-1/2 h-[540px] flex flex-col justify-center items-center py-[48px] gap-[8px]'>
          <text className='absolute top-[16px] text-content text-xl'>
            Expected
          </text>
          <view className='child-1 size-[48px] border border-line' />
          <view className='child-2 size-[48px] border border-line' />
          <view className='child-3 size-[48px] border border-line' />
          <view className='child-4 size-[48px] border border-line' />
          <view className='child-5 size-[48px] border border-line' />
        </view>
      </view>
    </view>
  );
}

export { NestedCSSVar };
