// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

/**
 * Busy-loop: block current thread for `ms` milliseconds.
 * - Blocks the event loop, so no other tasks can run.
 * - Use only in blocking scenarios.
 * @param ms milliseconds
 */
export function sleep(ms: number) {
  if (__ENABLE_BACKGROUND_BLOCKING__) {
    const start = Date.now();
    while (Date.now() - start < ms) {
      // Intentionally do nothing
    }
  }
}
