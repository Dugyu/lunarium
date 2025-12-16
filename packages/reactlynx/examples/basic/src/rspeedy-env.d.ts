/// <reference types="@lynx-js/rspeedy/client" />

import '@dugyu/luna-reactlynx/runtime/global-props';

declare module '@lynx-js/types' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface GlobalProps {
    /**
     * Define your global properties in this interface.
     * These types will be accessible through `lynx.__globalProps`.
     */
  }
}
