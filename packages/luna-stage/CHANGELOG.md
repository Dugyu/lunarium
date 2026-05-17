# @dugyu/luna-stage

## 0.2.2

### Patch Changes

- Updated dependencies []:
  - @dugyu/luna-core@0.5.0

## 0.2.1

### Patch Changes

- Fix intermittent `<lynx-view>` load races by: ([#124](https://github.com/Dugyu/lunarium/pull/124))

  - Mounting `<lynx-view>` only after the Lynx runtime is ready and the custom element is defined
  - Passing `url` via JSX attribute at element creation time (avoid ref/effect timing races)
  - Exposing `src` and `ready` from `useLynxStage` to support the safer mounting flow
  - Forwarding `<lynx-view>` `error` events to `onError` to avoid false-positive `onReady`

## 0.2.0

### Minor Changes

- Fix `Stage` alignment semantics: `alignX`/`alignY` now behave like CSS `object-position` within the stage viewport (self-contained, no parent anchor positioning required). ([#120](https://github.com/Dugyu/lunarium/pull/120))

  This is a breaking behavior change if you previously relied on the old `Stage` being a zero-size anchor that your parent layout positioned.

  Migration:

  - `Stage` now renders a viewport that fills its parent by default (`width/height: 100%`). Make sure the parent has an explicit size, or pass `width`/`height` to `Stage`.
  - To control where the internal anchor sits inside the viewport, use `placeX`/`placeY` (defaults to `alignX`/`alignY`).

## 0.1.1

### Patch Changes

- Remove unnecessary react-dom peer dependency and refresh installation docs. ([#117](https://github.com/Dugyu/lunarium/pull/117))

## 0.1.0

### Minor Changes

- Initial release. ([#115](https://github.com/Dugyu/lunarium/pull/115))

### Patch Changes

- Updated dependencies [[`618e237`](https://github.com/Dugyu/lunarium/commit/618e237b50baa90e00517a17f36d680b77860296)]:
  - @dugyu/luna-core@0.4.0
