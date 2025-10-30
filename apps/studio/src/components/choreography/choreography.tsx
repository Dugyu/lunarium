import { LayoutGroup } from 'motion/react';

import type { StudioViewMode } from '@/types';

import { DynamicView } from './dynamic-view.tsx';

type ChoreographyProps = {
  viewMode: StudioViewMode;
  className?: string;
};

function Choreography({ viewMode = 'compare', className }: ChoreographyProps) {
  return (
    <LayoutGroup id='luna-studio'>
      <DynamicView
        mode={viewMode}
        key='luna-studio-dynamic-view'
        className={className}
      />
    </LayoutGroup>
  );
}

export { Choreography };

export type { ChoreographyProps };
