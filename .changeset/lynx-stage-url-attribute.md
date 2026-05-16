---
"@dugyu/luna-stage": patch
---

Fix `<lynx-view>` initialization race by setting `url` via JSX attribute and mounting only after the Lynx runtime is ready. Expose `src` and `ready` from `useLynxStage` to support this flow.
