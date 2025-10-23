import { Tab, TabGroup, TabList } from '@headlessui/react';
import { Columns2, GalleryHorizontalEnd, Grid3x2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ForwardedRef } from 'react';

import { cn } from '@/utils';

const TabIcon = forwardRef<HTMLDivElement, TabIconProps>(
  TabIconImpl,
);

type MenuBarProps = {
  onViewModeChange?: (index: number) => void;
};

function MenuBar({ onViewModeChange }: MenuBarProps) {
  return (
    <div className='absolute bottom-4 right-4 rounded-full shadow-sm bg-[#ffffffbb]'>
      <TabGroup
        onChange={onViewModeChange}
      >
        <TabList className='flex md:flex-col justify-between items-center px-3 py-2 md:px-3 md:py-5 gap-4 md:gap-5'>
          <TabIcon icon={Columns2} />
          <TabIcon icon={GalleryHorizontalEnd} />
          <TabIcon icon={Grid3x2} />
        </TabList>
      </TabGroup>
    </div>
  );
}

type TabIconProps =
  & ComponentPropsWithoutRef<typeof Tab>
  & Omit<ComponentPropsWithoutRef<'div'>, 'children'>
  & { icon: LucideIcon };

function TabIconImpl(props: TabIconProps, ref: ForwardedRef<HTMLDivElement>) {
  const { icon: Icon, className, ...restProps } = props;

  return (
    <Tab
      ref={ref}
      className={cn(
        'transition-all cursor-pointer rounded-full outline-none focus:outline-none focus-visible:outline-none ui-selected:opacity-100 opacity-50 hover:scale-125',
        className,
      )}
      {...restProps}
    >
      <Icon className='w-4 h-4 md:w-5 md:h-5' />
    </Tab>
  );
}

export { MenuBar };
