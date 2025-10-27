import { useState } from 'react';

import { Choreography } from '@/components/choreography';
import type { ChoreographyViewMode } from '@/components/choreography';
import { MenuBar } from '@/components/menu-bar';
import { StudioFrame } from '@/components/studio-frame';

const viewModes: ChoreographyViewMode[] = ['compare', 'focus', 'lineup'];

function Studio() {
  const [viewMode, setViewMode] = useState<ChoreographyViewMode>('compare');
  return (
    <StudioFrame
      className={'pointer-events-auto relative luna-studio'}
    >
      <Choreography viewMode={viewMode} />
      <MenuBar
        onViewModeChange={(i) => setViewMode(viewModes[i])}
        className='z-[1000]'
      />
    </StudioFrame>
  );
}

export { Studio };
