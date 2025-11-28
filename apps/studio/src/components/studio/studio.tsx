import { useState } from 'react';

import { Choreography } from '@/components/choreography';
import { MenuBar } from '@/components/menu-bar';
import { StudioFrame } from '@/components/studio-frame';
import type { StudioViewMode } from '@/types';
import { cn } from '@/utils';

const viewModes: StudioViewMode[] = ['compare', 'focus', 'lineup'];

function Studio() {
  const [viewMode, setViewMode] = useState<StudioViewMode>('compare');
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  return (
    <StudioFrame
      className={cn(
        'pointer-events-auto relative luna-studio transition-all duration-300 ease-in-out',
        themeMode === 'light' ? 'bg-[#f5f5f5]' : 'bg-[#2a2a2a]',
      )}
    >
      <Choreography viewMode={viewMode} onThemeModeChange={setThemeMode} />
      <MenuBar
        onViewModeChange={(i) => setViewMode(viewModes[i])}
        className='z-[1000]'
        themeMode={themeMode}
      />
    </StudioFrame>
  );
}

export { Studio };
