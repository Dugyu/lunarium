// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

export type Expand<T> =
  & {
    [K in keyof T]: T[K];
  }
  & {};

export type Modify<T, R> = Omit<T, keyof R> & R;

export type RenameKeys<T, Map extends Record<string, PropertyKey>> =
  & Omit<
    T,
    keyof Map
  >
  & { [K in keyof Map as Map[K]]: K extends keyof T ? T[K] : never };

export type OmitKeys<P, K extends PropertyKey> = Omit<P, Extract<K, keyof P>>;
