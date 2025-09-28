// Number pattern: supports +/- signs, decimals, leading dot (.5), and scientific notation (e/E)
const NUM_SRC = String.raw`[+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:e[+-]?\d+)?`;
const SCALE_SINGLE_RE = new RegExp(
  String.raw`^scale\(\s*(${NUM_SRC})(?:\s*,\s*(${NUM_SRC}))?\s*\)`,
  'i', // case-insensitive so "e" and "E" both work, avoids duplicate character class issues
);

/**
 * Parse the last occurrence of `scale(...)` from a CSS transform string.
 * Returns { x: ScaleX, y: ScaleY }; if not found, returns null.
 */
function getLastScaleFromTransform(
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

  const sx = Number.parseFloat(m[1]);
  const sy = m[2] !== undefined ? Number.parseFloat(m[2]) : sx; // if only one argument, sy = sx
  return { x: sx, y: sy };
}

export { getLastScaleFromTransform };
