import type { LynxView } from '@lynx-js/web-core';
import type { CSSProperties, Ref } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lynx-view': {
        url?: string;
        ref?: Ref<LynxView>;
        style?: CSSProperties;
        ['lynx-group-id']?: number;
      };
    }
  }
}
