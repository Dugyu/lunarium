import {
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import type { MotionValue } from 'motion/react';
import * as motion from 'motion/react-client';
import { useLayoutEffect } from 'react';
import type { CSSProperties, ReactNode } from 'react';

import { cn } from '@/utils';

import { useVisualSize } from './context/use-visual-size.ts';

type Align = 'start' | 'center' | 'end';

const OUTLINE_WEIGHT = 6;
const alignFactor = (
  a?: Align,
) => (a === 'start' ? 0 : (a === 'end' ? 1 : 0.5));

const SMOOTHING_OUTLINE_PATH =
  `M0 96C0 62.3968 0 45.5953 6.53961 32.7606C12.292 21.4708 21.4708 12.292 32.7606 6.53961C45.5953 0 62.3969 0 96 0H291C324.603 0 341.405 0 354.239 6.53961C365.529 12.292 374.708 21.4708 380.46 32.7606C387 45.5953 387 62.3968 387 96V728C387 761.603 387 778.405 380.46 791.239C374.708 802.529 365.529 811.708 354.239 817.46C341.405 824 324.603 824 291 824H96C62.3969 824 45.5953 824 32.7606 817.46C21.4708 811.708 12.292 802.529 6.53961 791.239C0 778.405 0 761.603 0 728V96Z`;
const SMOOTHING_PATH =
  `M0 86.4C0 56.1572 0 41.0357 5.88565 29.4845C11.0628 19.3238 19.3238 11.0628 29.4845 5.88565C41.0357 0 56.1572 0 86.4 0H288.6C318.843 0 333.964 0 345.516 5.88565C355.676 11.0628 363.937 19.3238 369.114 29.4845C375 41.0357 375 56.1572 375 86.4V725.6C375 755.843 375 770.964 369.114 782.516C363.937 792.676 355.676 800.937 345.516 806.114C333.964 812 318.843 812 288.6 812H86.4C56.1572 812 41.0357 812 29.4845 806.114C19.3238 800.937 11.0628 792.676 5.88565 782.516C0 770.964 0 755.843 0 725.6V86.4Z`;

const DEVICE_CLIP_PATH = `path("${SMOOTHING_PATH}")`;
const DEVICE_OUTLINE_CLIP_PATH = `path("${SMOOTHING_OUTLINE_PATH}")`;

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

const DEFAULT_FIT = { stiffness: 170, damping: 26 };
const DEFAULT_ZOOM = { stiffness: 170, damping: 26 };

type MockupMotionProps = {
  /**
   * Motion Value Width
   */
  width?: MotionValue<number>;
  /**
   * Motion Value Height
   */
  height?: MotionValue<number>;
  baseWidth?: number;
  baseHeight?: number;
  fit?: 'contain' | 'cover';
  /** Continuous interpolation (0: contain ... 1: cover), overrides `fit` if provided */
  fitProgress?: number;
  /** Extra zoom factor: 1 = no change, >1 = zoom in, <1 = zoom out */
  zoom?: number;
  /** Optional custom spring settings */
  fitTransition?: { stiffness?: number; damping?: number };
  zoomTransition?: { stiffness?: number; damping?: number };
  align?: { x?: Align; y?: Align };
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

function MotionMockup({
  width: widthProp,
  height: heightProp,
  baseWidth = 375,
  baseHeight = 812,
  fit = 'contain',
  fitProgress,
  zoom = 1,
  fitTransition = DEFAULT_FIT,
  zoomTransition = DEFAULT_ZOOM,
  align = { x: 'center', y: 'center' } as { x?: Align; y?: Align },
  className,
  style,
  children,
}: MockupMotionProps) {
  const visualSizeCtx = useVisualSize();
  const baseW = useMotionValue(baseWidth);
  const baseH = useMotionValue(baseHeight);

  const width = widthProp
    ?? visualSizeCtx?.visualW ?? baseW;

  const height = heightProp
    ?? visualSizeCtx?.visualH ?? baseH;

  const ax = alignFactor(align.x);
  const ay = alignFactor(align.y);

  const ratioW = useTransform(() => width.get() / baseWidth);
  const ratioH = useTransform(() => height.get() / baseHeight);

  const tMv = useMotionValue(0);
  const zMv = useMotionValue(1);

  useLayoutEffect(() => {
    if (typeof fitProgress === 'number') {
      tMv.set(clamp01(fitProgress));
    } else {
      tMv.set(fit === 'cover' ? 1 : 0);
    }
  }, [fit, fitProgress, tMv]);

  useLayoutEffect(() => {
    zMv.set(zoom ?? 1);
  }, [zoom, zMv]);

  const minScale = useTransform(() => Math.min(ratioW.get(), ratioH.get()));
  const maxScale = useTransform(() => Math.max(ratioW.get(), ratioH.get()));

  const t = useSpring(tMv, fitTransition);
  const z = useSpring(zMv, zoomTransition);

  const scale = useTransform(() =>
    minScale.get() + (maxScale.get() - minScale.get()) * t.get() * z.get()
  );

  const offsetX = useTransform(() => -(baseWidth * scale.get()) * ax);
  const offsetY = useTransform(() => -(baseHeight * scale.get()) * ay);

  const outlineX = useTransform(() =>
    offsetX.get() - OUTLINE_WEIGHT * scale.get()
  );
  const outlineY = useTransform(() =>
    offsetY.get() - OUTLINE_WEIGHT * scale.get()
  );

  const frameTransform =
    useMotionTemplate`translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
  const outlineTransform =
    useMotionTemplate`translate(${outlineX}px, ${outlineY}px) scale(${scale})`;

  return (
    <div className='relative w-0 h-0 overflow-visible pointer-events-none'>
      {/* Device outline */}
      <motion.div
        className={cn(
          'absolute origin-top-left pointer-events-none',
          className,
        )}
        style={{
          ...style,
          width: baseWidth + 2 * OUTLINE_WEIGHT,
          height: baseHeight + 2 * OUTLINE_WEIGHT,
          transform: outlineTransform,
          clipPath: DEVICE_OUTLINE_CLIP_PATH,
          willChange: 'transform',
        }}
      >
      </motion.div>
      {/* Device frame */}
      <motion.div
        className='absolute origin-top-left overflow-hidden cursor-pointer pointer-events-none'
        style={{
          width: baseWidth,
          height: baseHeight,
          transform: frameTransform,
          clipPath: DEVICE_CLIP_PATH,
          willChange: 'transform',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export { MotionMockup };
