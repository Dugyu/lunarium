import type { LynxView } from '@lynx-js/web-core';
import type { CSSProperties, Dispatch, SetStateAction } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lynx-view': {
        url: string;
        ref?: Dispatch<SetStateAction<LynxView | null | undefined>>;
        style?: CSSProperties;
      };
    }
  }
}
