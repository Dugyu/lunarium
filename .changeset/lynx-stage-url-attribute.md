---
"@dugyu/luna-stage": patch
---

Fix intermittent `<lynx-view>` load races by:

- Mounting `<lynx-view>` only after the Lynx runtime is ready and the custom element is defined
- Passing `url` via JSX attribute at element creation time (avoid ref/effect timing races)
- Exposing `src` and `ready` from `useLynxStage` to support the safer mounting flow
- Forwarding `<lynx-view>` `error` events to `onError` to avoid false-positive `onReady`
