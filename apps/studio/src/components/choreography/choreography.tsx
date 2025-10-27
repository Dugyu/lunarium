import { LayoutGroup } from 'motion/react';

import { DynamicView } from './dynamic-view.tsx';
import type { ViewMode } from './dynamic-view.tsx';

type ChoreographyViewMode = ViewMode;

type ChoreographyProps = {
  viewMode: ChoreographyViewMode;
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

export type { ChoreographyViewMode };
