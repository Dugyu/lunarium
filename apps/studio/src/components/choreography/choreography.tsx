import { LayoutGroup } from 'motion/react';

import { DynamicView } from './dynamic-view.tsx';
import type { ViewMode } from './dynamic-view.tsx';

type ChoreographyViewMode = ViewMode;

type ChoreographyProps = {
  viewMode: ChoreographyViewMode;
};

function Choreography({ viewMode = 'compare' }: ChoreographyProps) {
  return (
    <LayoutGroup id='luna-studio'>
      <DynamicView mode={viewMode} key='luna-studio-dynamic-view' />
    </LayoutGroup>
  );
}

export { Choreography };

export type { ChoreographyViewMode };
