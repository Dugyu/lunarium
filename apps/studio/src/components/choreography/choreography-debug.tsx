import { LayoutGroup } from 'motion/react';
import * as motion from 'motion/react-client';
import { useState } from 'react';

import { StudioFrame } from '@/components/studio-frame';
import { cn } from '@/utils';

function ChoreographyDebug() {
  const [landscape, setLandscape] = useState(false);
  return (
    <StudioFrame
      className={cn('justify-between', landscape ? 'flex-row' : 'flex-col')}
    >
      <LayoutGroup>
        <motion.div
          layout
          layoutCrossfade={false}
          className='bg-rose-300 flex-1'
        >
        </motion.div>
        <motion.div
          layout
          layoutCrossfade={false}
          className='bg-rose-500 flex-1'
          onLayoutMeasure={(box, prevBox) => {
            console.log(box, prevBox);
          }}
        >
        </motion.div>
        <motion.div
          layout
          layoutCrossfade={false}
          animate={{ borderRadius: '24px' }}
          className='bg-rose-700 flex-1 cursor-pointer pointer-events-auto flex justify-center items-center'
          onClick={() => setLandscape(prev => !prev)}
          transformTemplate={(_latest, generated) => {
            if (generated) {
              console.log('parent ---', generated);
            }
            return generated;
          }}
        >
          <motion.div
            layout
            className='bg-black w-[48px] h-[48px] flex flex-col justify-center items-center'
            animate={{ origin: 'center' }}
            transformTemplate={(_latest, generated) => {
              const scaleRegex = /scale\(([^)]+)\)\s*scale\(([^)]+)\)/;
              const m = scaleRegex.exec(generated);
              if (m) {
                const [sx1, sy1 = sx1] = m[1].split(',').map(n =>
                  parseFloat(n)
                );
                const [sx2, sy2 = sx2] = m[2].split(',').map(n =>
                  parseFloat(n)
                );
                const sx = sx1 * sx2;
                const sy = sy1 * sy2;
                const eps = 1e-9;
                const sxClean = Math.abs(sx - 1) < eps ? 1 : sx;
                const syClean = Math.abs(sy - 1) < eps ? 1 : sy;

                const cleanTransformString = generated.replace(
                  /scale\([^)]+\)\s*scale\([^)]+\)/,
                  `scale(${sxClean}, ${syClean})`,
                );

                return cleanTransformString;
              }
              if (generated) {
                console.log(generated);
              }
              return generated;
            }}
          >
            <div className='w-1/2 h-1/2 bg-pink-500'></div>
          </motion.div>
        </motion.div>
      </LayoutGroup>
    </StudioFrame>
  );
}

export { ChoreographyDebug };
