---
"@dugyu/luna-stage": minor
---

Fix `Stage` alignment semantics: `alignX`/`alignY` now behave like CSS `object-position` within the stage viewport (self-contained, no parent anchor positioning required).

This is a breaking behavior change if you previously relied on the old `Stage` being a zero-size anchor that your parent layout positioned.

Migration:

- `Stage` now renders a viewport that fills its parent by default (`width/height: 100%`). Make sure the parent has an explicit size, or pass `width`/`height` to `Stage`.
- To control where the internal anchor sits inside the viewport, use `placeX`/`placeY` (defaults to `alignX`/`alignY`).
