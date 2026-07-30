---
"@dugyu/luna-stage": patch
---

Fix luna-stage migration drift found during the lynx-ui review.

- Fix React namespace ref typing under module TypeScript configs and align merged ref callback semantics with unmount cleanup.
- Treat null context values as present in createContextWithProvider.
- Measure container size before subscribing to ResizeObserver and use the SSR-safe layout effect.
- Rewire native module callbacks and global props when the resolved Lynx bundle URL changes.
- Reset MotionStageContainer scale state when transforms omit scale() and when layout animation completes.
- Clarify resolveBundleSrc reload semantics and include missing build inputs in Turbo configs.
