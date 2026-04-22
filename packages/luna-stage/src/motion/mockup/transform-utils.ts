// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

const NUM_SRC = String.raw`[+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:e[+-]?\d+)?`;
const SCALE_SINGLE_RE = new RegExp(
  String.raw`^scale\(\s*(${NUM_SRC})(?:\s*,\s*(${NUM_SRC}))?\s*\)`,
  'i', // case-insensitive so "e" and "E" both work, avoids duplicate character class issues
);

/**
 * Parse the last occurrence of `scale(...)` from a CSS transform string.
 * Returns { x: ScaleX, y: ScaleY }; if not found, returns null.
 */
export function getLastScaleFromTransform(
  transform: string,
): { x: number; y: number } | null {
  if (!transform) return null;

  // Find the last index of "scale(" (case-insensitive)
  const lower = transform.toLowerCase();
  const idx = lower.lastIndexOf('scale(');
  if (idx === -1) return null;

  // Slice from the last "scale(" and extract numbers with a small regex
  const suffix = transform.slice(idx);
  const m = SCALE_SINGLE_RE.exec(suffix);
  if (!m) return null;

  // m[1] is guaranteed by the regex pattern (required capture group)
  const sx = Number.parseFloat(m[1]!);
  const sy = m[2] !== undefined ? Number.parseFloat(m[2]) : sx; // if only one argument, sy = sx
  return { x: sx, y: sy };
}

/**
 * Compute the perspective depth scale for a given world-space Z position.
 *
 * Equivalent to the perspective divide in a pinhole camera model:
 * `w = f / (f + z)`, where `f` is the focal length and `z` is the
 * depth of the object in front of the camera.
 *
 * - Returns `1` (orthographic) when `focalLength` is absent or `<= 0`.
 * - As `z` increases (object moves away), the scale decreases — objects
 *   appear smaller the further they are from the camera.
 */
export function computeDepthScale(
  focalLength: number | undefined,
  worldZ: number,
): number {
  if (!focalLength || focalLength <= 0) return 1;
  return focalLength / (focalLength + worldZ);
}

export type ScreenTranslation = {
  /** Final screen-space translation along X, in pixels */
  x: number;
  /** Final screen-space translation along Y, in pixels */
  y: number;
};

export type ScreenTranslationInput = {
  /** World-space X position of the frame */
  worldX: number;
  /** World-space Y position of the frame */
  worldY: number;
  /** Perspective depth scale — output of `computeDepthScale` */
  depthScale: number;
  /** Direct screen-space pan offset along X, in pixels */
  screenPanX: number;
  /** Direct screen-space pan offset along Y, in pixels */
  screenPanY: number;
};

/**
 * Compute the final screen-space translation by projecting world-space
 * XY coordinates into screen space via the perspective depth scale,
 * then adding direct screen-space pan offsets.
 *
 * This compensates for the principal-point shift that occurs when an
 * object moves in Z — without this, a depth change would also cause
 * an unwanted lateral drift on screen.
 */
export function computeScreenTranslation(
  input: ScreenTranslationInput,
): ScreenTranslation {
  const { worldX, worldY, depthScale, screenPanX, screenPanY } = input;
  return {
    x: worldX * depthScale + screenPanX,
    y: worldY * depthScale + screenPanY,
  };
}
