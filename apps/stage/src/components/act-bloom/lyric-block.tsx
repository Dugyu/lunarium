type LyricBlockProps = {
  lines: string[];
  artist?: string;
  title?: string;
};

export function LyricBlock({ lines, artist, title }: LyricBlockProps) {
  return (
    <view className='w-fll flex flex-col gap-[10px]'>
      <view className='flex flex-col items-start justify-center gap-[2px]'>
        {lines.map((line, i) => (
          <text
            key={i}
            className='text-base text-primary-content opacity-50'
          >
            {line}
          </text>
        ))}
      </view>

      {artist && (
        <view className='flex flex-col items-start justify-center self-end'>
          <text className='text-base text-primary-content opacity-50 pt-[4px]'>
            {title ? `${title} by ` : ''}
            <text className='text-base text-primary-content font-semibold'>
              {artist}
            </text>
          </text>
        </view>
      )}
    </view>
  );
}
