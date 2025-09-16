import { clsx } from 'clsx';
import { forwardRef, useMemo, useRef } from 'react';
import type {
  CSSProperties,
  ComponentPropsWithoutRef,
  ForwardedRef,
  ReactNode,
} from 'react';

import { createContextWithProvider } from '@/components/context';
import { useContainerResize } from '@/hooks/use-container-resize.ts';
import { useMergedRefs } from '@/hooks/use-merged-refs.ts';

const [MockupSizeProvider, useOptionalMockupSize] = createContextWithProvider<
  { width: number; height: number }
>('Mockup', undefined, { throwIfMissing: false });

const SMOOTHING_PATH =
  `M0 86.4C0 56.1572 0 41.0357 5.88565 29.4845C11.0628 19.3238 19.3238 11.0628 29.4845 5.88565C41.0357 0 56.1572 0 86.4 0H288.6C318.843 0 333.964 0 345.516 5.88565C355.676 11.0628 363.937 19.3238 369.114 29.4845C375 41.0357 375 56.1572 375 86.4V725.6C375 755.843 375 770.964 369.114 782.516C363.937 792.676 355.676 800.937 345.516 806.114C333.964 812 318.843 812 288.6 812H86.4C56.1572 812 41.0357 812 29.4845 806.114C19.3238 800.937 11.0628 792.676 5.88565 782.516C0 770.964 0 755.843 0 725.6V86.4Z`;

const DEFAULT_BASE_W = 375;
const DEFAULT_BASE_H = 812;

const DEVICE_CLIP_PATH = `path("${SMOOTHING_PATH}")`;

function Mockup({
  className,
  style,
  width: widthProp,
  height: heightProp,
  fit = 'contain',
  align = { x: 'center', y: 'center' },
  children,
  baseWidth = DEFAULT_BASE_W,
  baseHeight = DEFAULT_BASE_H,
}: MockupProps) {
  const ctx = useOptionalMockupSize();

  const width = widthProp
    ?? ctx?.width ?? baseWidth;

  const height = heightProp
    ?? ctx?.height ?? baseHeight;

  const scaleInfo = useMemo(() => {
    const ratioW = width / baseWidth;
    const ratioH = height / baseHeight;
    const scale = fit === 'cover'
      ? Math.max(ratioW, ratioH)
      : Math.min(ratioW, ratioH);

    const scaledW = baseWidth * scale;
    const scaledH = baseHeight * scale;

    const xFactor = calculateAlignmentFactor(align.x ?? 'center');
    const yFactor = calculateAlignmentFactor(align.y ?? 'center');

    const offsetX = -scaledW * xFactor;
    const offsetY = -scaledH * yFactor;

    return {
      scale,
      scaledW,
      scaledH,
      offsetX,
      offsetY,
    };
  }, [width, height, baseWidth, baseHeight, fit, align.x, align.y]);

  return (
    // Anchor & coordinate system element, no size
    <div
      className={'relative w-0 h-0'}
    >
      {/* Device frame */}
      <div
        className={clsx('absolute overflow-hidden', className)}
        style={{
          ...style,
          width: baseWidth,
          height: baseHeight,
          transformOrigin: 'top left',
          transform:
            `translate(${scaleInfo.offsetX}px, ${scaleInfo.offsetY}px) scale(${scaleInfo.scale})`,
          clipPath: DEVICE_CLIP_PATH,
        }}
      >
        {/* Content area inside the device */}
        {children}
      </div>
    </div>
  );
}

type MockupContainerProps = ComponentPropsWithoutRef<'div'> & {
  fallbackSize?: { width: number; height: number };
};

function MockupContainerImpl(
  props: MockupContainerProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const { fallbackSize = { width: 0, height: 0 }, children, ...restProps } =
    props;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const { width = fallbackSize.width, height = fallbackSize.height } =
    useContainerResize({
      ref: containerRef,
    });

  const mergedRef = useMergedRefs(containerRef, ref);

  return (
    <MockupSizeProvider
      width={width}
      height={height}
    >
      <div ref={mergedRef} {...restProps}>
        {children}
      </div>
    </MockupSizeProvider>
  );
}

const MockupContainer = forwardRef(MockupContainerImpl);

export { Mockup, MockupContainer };
export type { MockupProps };

type MockupProps = {
  className?: string;
  style?: CSSProperties;
  width?: number;
  height?: number;
  fit?: 'contain' | 'cover';
  align?: {
    x?: 'left' | 'center' | 'right';
    y?: 'top' | 'center' | 'bottom';
  };
  children?: ReactNode; // Support custom content
  baseWidth?: number; // Base mockup width
  baseHeight?: number; // Base mockup height
};

// Utility to convert alignment string into numeric offset factor
function calculateAlignmentFactor(alignment: string): number {
  switch (alignment) {
    case 'left':
    case 'top':
      return 0;
    case 'right':
    case 'bottom':
      return 1;
    default:
      return 0.5;
  }
}
