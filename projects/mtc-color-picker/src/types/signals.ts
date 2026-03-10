// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import type { computed, signal } from '@lynx-js/react/signals';

type ReadonlySignal<T> = ReturnType<typeof computed<T>>;
type Signal<T> = ReturnType<typeof signal<T>>;

export type { Signal, ReadonlySignal };
