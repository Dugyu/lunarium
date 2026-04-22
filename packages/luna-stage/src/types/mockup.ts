// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import type { CSSProperties, ComponentPropsWithoutRef, ReactNode } from 'react';

import type { AlignX, AlignY } from './align.js';

export type MockupBaseProps = {
  /**
   * Base (design) width of the device frame in pixels.
   */
  baseWidth?: number;
  /**
   * Base (design) height of the device frame in pixels.
   */
  baseHeight?: number;
  /**
   * How the base device frame fits into the target viewport.
   *
   * - `contain`: scales down to fully fit inside the viewport
   * - `cover`: scales up to fully cover the viewport (may crop)
   */
  fit?: 'contain' | 'cover';
  /**
   * Anchor point for fitting and cropping.
   *
   * Horizontal alignment of the cropped content.
   * `left`/`right` are physical directions.
   *
   * Defaults to `center`.
   */
  alignX?: AlignX;
  /**
   * Anchor point for fitting and cropping.
   *
   * Vertical alignment of the cropped content.
   * `top`/`bottom` are physical directions.
   *
   * Defaults to `center`.
   */
  alignY?: AlignY;
  /**
   * Additional class name applied to the device outline layer.
   */
  className?: string;
  /**
   * Inline style applied to the device outline layer.
   */
  style?: CSSProperties;
  /**
   * Content rendered inside the device frame.
   */
  children?: ReactNode;
  /**
   * Additional zoom factor.
   *
   * - `1`: no change
   * - `> 1`: zoom in
   * - `< 1`: zoom out
   */
  zoom?: number;
  /**
   * Additional translation applied along the X axis in screen space (pixels).
   */
  panX?: number;
  /**
   * Additional translation applied along the Y axis in screen space (pixels).
   */
  panY?: number;
};

export type MockupProps =
  & MockupBaseProps
  & {
    /**
     * Target viewport width in pixels.
     *
     * When omitted, it uses the measured size from `MockupContainer` if present,
     * otherwise falls back to `baseWidth`.
     */
    width?: number;
    /**
     * Target viewport height in pixels.
     *
     * When omitted, it uses the measured size from `MockupContainer` if present,
     * otherwise falls back to `baseHeight`.
     */
    height?: number;
  }
  & Pick<ComponentPropsWithoutRef<'div'>, 'onClick'>;
