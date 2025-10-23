import { LayoutGroup } from 'motion/react';

import { DynamicView } from './dynamic-view.tsx';

type ChoreographyViewMode = 'compare' | 'focus' | 'lineup';

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
