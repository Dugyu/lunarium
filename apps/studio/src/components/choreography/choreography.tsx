import { LayoutGroup } from 'motion/react';
import { useState } from 'react';

import { StudioFrame } from '@/components/studio-frame';

import { DynamicView } from './dynamic-view.tsx';

type ViewMode = 'compare' | 'focus' | 'lineup';

function Choreography() {
  const [mode, setMode] = useState<ViewMode>('compare');

  return (
    <StudioFrame
      className={'pointer-events-auto relative luna-studio'}
      onClick={() => setMode(prev => loopMode(prev))}
    >
      <LayoutGroup id='luna-studio'>
        <DynamicView mode={mode} key='luna-studio-dynamic-view' />
      </LayoutGroup>
    </StudioFrame>
  );
}

function loopMode(prev: ViewMode): ViewMode {
  switch (prev) {
    case 'compare':
      return 'focus';
    case 'focus':
      return 'lineup';
    case 'lineup':
      return 'compare';
    default:
      return 'compare';
  }
}

export { Choreography };
