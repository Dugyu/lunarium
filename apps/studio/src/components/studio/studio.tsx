import { useState } from 'react';

import { Choreography } from '@/components/choreography';
import { MenuBar } from '@/components/menu-bar';
import { StudioFrame } from '@/components/studio-frame';
import type { StudioViewMode } from '@/types';

const viewModes: StudioViewMode[] = ['compare', 'focus', 'lineup'];

function Studio() {
  const [viewMode, setViewMode] = useState<StudioViewMode>('compare');
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
