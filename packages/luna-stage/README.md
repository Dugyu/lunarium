# luna-stage

> Stage system and showcase components for the L.U.N.A project.
> Atomic components for rendering Lynx bundles into a device shell / stage in the browser.

Use `luna-stage` when you need a single-frame preview (`Mockup` + `LunaLynxStage`) or motion-enhanced presentation (`MotionMockup`, etc.). For multi-stage orchestration and Studio-level layout, see [`@dugyu/luna-studio`](../luna-studio).

## Installation

```sh
pnpm i @dugyu/luna-stage
```

**Peer dependencies** — install in your application:

```sh
pnpm i react @lynx-js/web-core
```

For motion capabilities, `motion` is an optional peer dependency:

```sh
pnpm i motion
```

## Two Entry Points

| Import path                | Requires `motion` | Use when                                 |
| -------------------------- | ----------------- | ---------------------------------------- |
| `@dugyu/luna-stage`        | No                | Static display, no animation             |
| `@dugyu/luna-stage/motion` | Yes               | Animated transitions, perspective camera |

## Concepts

### Device Frame Model

- `baseWidth` / `baseHeight` define the **design baseline** (default `375×812`), not the container size
- The component renders at `baseWidth×baseHeight` and uses CSS `transform: scale()` to fit into the container
- Two visual layers: **outline** (decorative border, simulates device thickness) and **frame** (content area with clip-path)
- The root element is a zero-size anchor (`w-0 h-0 overflow-visible`) — the device frame extends outward from it

### Fit System

- `contain` — scales down to fit fully inside the container (no cropping)
- `cover` — scales up to fully cover the container (may crop)
- `alignX` / `alignY` — control which part of the frame is preserved when `cover` crops. Physical directions: `left | center | right` / `top | center | bottom`
- `fitProgress` _(motion only)_ — continuous `0→1` interpolation between `contain` and `cover`, driven by a spring

### Camera Model _(MotionMockup only)_

The transform pipeline operates in two independent spaces:

**Screen space**

- `fit` / `fitProgress` — container-driven passive scaling
- `zoom` — user-controlled active scaling, applied on top of fit
- `panX` / `panY` — screen-space translation in pixels, applied after all scaling

**World space**

- `world` — 3D position of the frame `{ x, y, z }`. Follows the CSS/OpenGL convention: `+Z` points toward the viewer.
- `focalLength` — perspective intensity. When `> 0`, enables perspective projection. When `0` or omitted, orthographic.
- `world.x/y` are projected into screen space before being composited with `panX/panY`. The spring animates the combined screen-space value.

Final scale = `lerpFitScale(contain, cover, fitSpring) × zoom × depthScale`

Final translation = `world.xy × depthScale + panXY`

## Quick Start

### Single-frame preview with `LunaLynxStage`

```tsx
import { Mockup, LunaLynxStage } from '@dugyu/luna-stage';

export default function Preview() {
  return (
    <Mockup>
      <LunaLynxStage
        entry='my-component'
        bundleBaseUrl='/bundles/'
        lunaTheme='lunaris'
        lunaThemeVariant='midnight'
      />
    </Mockup>
  );
}
```

Bundle URL convention: `${bundleBaseUrl}${entry}.web.bundle`

`lunaTheme` and `lunaThemeVariant` inject LUNA design token globals into the Lynx runtime. Omit them to use default theming.

### Without LUNA theming

Use `LynxStage` directly when you don't need LUNA global props forwarded:

```tsx
import { Mockup, LynxStage } from '@dugyu/luna-stage';

<Mockup>
  <LynxStage entry='my-component' bundleBaseUrl='/bundles/' />
</Mockup>;
```

### Standalone `LynxStage`

`LynxStage` can be used independently of the `Mockup` system if you just want to render a Lynx view in a DOM container:

```tsx
import { LynxStage } from '@dugyu/luna-stage';

export default function StandaloneView() {
  return (
    <div className='w-full h-screen'>
      <LynxStage entry='my-component' bundleBaseUrl='/bundles/' />
    </div>
  );
}
```

## API

### `Mockup`

Static device frame. Reads container size from `MockupContainer` context if present, otherwise falls back to `baseWidth/baseHeight`.

`Mockup` can be used in three ways:

**Standalone** — renders at design baseline size:

```tsx
<Mockup>
  <YourContent />
</Mockup>;
```

**Manual size** — explicit container dimensions:

```tsx
<Mockup width={390} height={844}>
  <YourContent />
</Mockup>;
```

**With `MockupContainer`** — auto-measures the container:

```tsx
<MockupContainer className='w-full h-full'>
  <Mockup>
    <YourContent />
  </Mockup>
</MockupContainer>;
```

| Prop         | Type                            | Default     | Description                                                      |
| ------------ | ------------------------------- | ----------- | ---------------------------------------------------------------- |
| `baseWidth`  | `number`                        | `375`       | Design baseline width in pixels                                  |
| `baseHeight` | `number`                        | `812`       | Design baseline height in pixels                                 |
| `width`      | `number`                        | —           | Container width. Falls back to `MockupContainer` → `baseWidth`   |
| `height`     | `number`                        | —           | Container height. Falls back to `MockupContainer` → `baseHeight` |
| `fit`        | `'contain' \| 'cover'`          | `'contain'` | Fit mode                                                         |
| `alignX`     | `'left' \| 'center' \| 'right'` | `'center'`  | Horizontal crop anchor                                           |
| `alignY`     | `'top' \| 'center' \| 'bottom'` | `'center'`  | Vertical crop anchor                                             |
| `zoom`       | `number`                        | `1`         | Additional zoom factor on top of fit                             |
| `panX`       | `number`                        | `0`         | Screen-space translation along X (px)                            |
| `panY`       | `number`                        | `0`         | Screen-space translation along Y (px)                            |
| `className`  | `string`                        | —           | Applied to the outline layer                                     |
| `style`      | `CSSProperties`                 | —           | Applied to the outline layer                                     |
| `onClick`    | `MouseEventHandler`             | —           | —                                                                |

### `MockupContainer`

Measures its own DOM size via `ResizeObserver` and provides width/height to child `Mockup` components via context.

| Prop             | Type     | Default | Description                   |
| ---------------- | -------- | ------- | ----------------------------- |
| `fallbackWidth`  | `number` | `0`     | Used before first measurement |
| `fallbackHeight` | `number` | `0`     | Used before first measurement |

### `LynxStage`

Core component for rendering Lynx bundles into a DOM container.

| Prop                  | Type                      | Default | Description                                                 |
| --------------------- | ------------------------- | ------- | ----------------------------------------------------------- |
| `entry`               | `string`                  | —       | Entry name for the Lynx bundle.                             |
| `bundleBaseUrl`       | `string`                  | `'/'`   | Base URL for bundle assets. Must end with a trailing slash. |
| `globalProps`         | `Record<string, unknown>` | —       | Global props to inject into the Lynx runtime.               |
| `groupId`             | `number`                  | `7`     | Shared Lynx worker group ID.                                |
| `onNativeModulesCall` | `function`                | —       | Callback for native module calls from Lynx runtime.         |
| `onReady`             | `function`                | —       | Callback when the view has rendered successfully.           |
| `onError`             | `function`                | —       | Callback when an error occurs during loading or rendering.  |

### `LunaLynxStage`

Extends `LynxStage` with LUNA theme properties.

| Prop               | Type                      | Default        | Description                                   |
| ------------------ | ------------------------- | -------------- | --------------------------------------------- |
| `lunaTheme`        | `LunaThemeKey`            | `'luna-light'` | LUNA theme key (e.g. `'luna-light'`).         |
| `lunaThemeVariant` | `LunaThemeVariant`        | `'luna'`       | LUNA theme variant (e.g. `'luna'`).           |
| `extraGlobalProps` | `Record<string, unknown>` | —              | Additional global props.                      |
| _(others)_         |                           |                | All `LynxStage` props (except `globalProps`). |

### `MotionMockup`

Animated device frame. Extends `Mockup`'s base props with spring-driven transitions and a perspective camera model.

| Prop             | Type                   | Default             | Description                                                                         |
| ---------------- | ---------------------- | ------------------- | ----------------------------------------------------------------------------------- |
| `width`          | `MotionValue<number>`  | —                   | Reactive container width                                                            |
| `height`         | `MotionValue<number>`  | —                   | Reactive container height                                                           |
| `fit`            | `'contain' \| 'cover'` | `'contain'`         | Fit mode (ignored when `fitProgress` is set)                                        |
| `fitProgress`    | `number`               | —                   | `0–1` blend between contain and cover                                               |
| `zoom`           | `number`               | `1`                 | Additional zoom factor                                                              |
| `panX`           | `number`               | `0`                 | Screen-space translation along X (px)                                               |
| `panY`           | `number`               | `0`                 | Screen-space translation along Y (px)                                               |
| `world`          | `{ x?, y?, z? }`       | `{ x:0, y:0, z:0 }` | World-space position. `+Z` toward viewer.                                           |
| `focalLength`    | `number`               | —                   | Perspective focal length (px). Omit for orthographic.                               |
| `fitTransition`  | `SpringOptions`        | —                   | Spring for `fit` / `fitProgress`                                                    |
| `zoomTransition` | `SpringOptions`        | —                   | Spring for `zoom`                                                                   |
| `panTransition`  | `SpringOptions`        | —                   | Spring for the combined screen-space translation (`panX/Y` + projected `world.x/y`) |
| `maskColor`      | `string`               | `'transparent'`     | Overlay mask color                                                                  |
| `maskOpacity`    | `number`               | `0`                 | Overlay mask opacity, animated                                                      |

### `MotionMockupContainer`

Motion-aware equivalent of `MockupContainer`. Provides `MotionValue<number>` width/height to child `MotionMockup` components via context. Handles layout animations and extracts the parent scale from `transformTemplate` to keep the visual size accurate during transitions.

### `MotionPresentation`

A zero-size anchor element (`4px × 4px`, `overflow-visible`) that wraps `AnimatePresence propagate`.

**Use when:** items are dynamically added/removed and need mount/unmount animations.

**Skip when:** components are always mounted, or you only need state transition animations.

## Usage Examples

### Motion: no mount/unmount

```tsx
import { MotionMockup, MotionMockupContainer } from '@dugyu/luna-stage/motion';

<MotionMockupContainer className='w-full h-full'>
  <MotionMockup fitProgress={0} zoom={1.2}>
    <YourContent />
  </MotionMockup>
</MotionMockupContainer>;
```

### Motion: with mount/unmount animations

```tsx
import {
  MotionMockup,
  MotionMockupContainer,
  MotionPresentation,
} from '@dugyu/luna-stage/motion';

const variants = {
  initial: { opacity: 0, x: -300 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 300 },
};

<AnimatePresence>
  {items.map(item => (
    <MotionMockupContainer key={item.id} layoutId={item.id}>
      <MotionPresentation
        variants={variants}
        initial='initial'
        animate='animate'
        exit='exit'
      >
        <MotionMockup world={item.world} focalLength={500}>
          <YourContent />
        </MotionMockup>
      </MotionPresentation>
    </MotionMockupContainer>
  ))}
</AnimatePresence>;
```

### Perspective carousel

Arrange frames along a circular arc. `+Z` is toward the viewer, so objects at `z < 0` appear further away:

```tsx
const theta = (index - mid) * (Math.PI / 9); // 20° apart
const world = {
  x: Math.sin(theta) * radius,
  z: -Math.cos(theta) * radius, // negative = further from viewer
};

<MotionMockup world={world} focalLength={500}>
  <YourContent />
</MotionMockup>;
```

### Orthographic compare layout

Omit `focalLength` (or set to `0`) — all frames render at equal scale regardless of `world.z`:

```tsx
<MotionMockup world={{ x: offset, y: 0, z: 0 }}>
  <YourContent />
</MotionMockup>;
```

## Component Table

| Component               | Entry point       | Description                                           |
| ----------------------- | ----------------- | ----------------------------------------------------- |
| `Mockup`                | `.`               | Static device frame                                   |
| `MockupContainer`       | `.`               | Auto-measures container, provides size via context    |
| `LynxStage`             | `. (To be split)` | Core Lynx bundle renderer (no LUNA globals)           |
| `LunaLynxStage`         | `. (To be split)` | `LynxStage` + LUNA theme prop injection               |
| `MotionMockup`          | `./motion`        | Animated device frame with perspective camera         |
| `MotionMockupContainer` | `./motion`        | Layout animation wrapper, provides `MotionValue` size |
| `MotionPresentation`    | `./motion`        | Mount/unmount transition orchestrator                 |

## Hooks

| Export                      | Description                                        |
| --------------------------- | -------------------------------------------------- |
| `useLynxStage`              | Core hook for managing Lynx runtime and lifecycle  |
| `useIsClient`               | SSR-safe client-side mount detection               |
| `useContainerResize`        | Observes container dimensions via `ResizeObserver` |
| `useMergedRefs`             | Merges multiple refs onto a single element         |
| `useIsomorphicLayoutEffect` | SSR-safe `useLayoutEffect`                         |

## SSR / SSG Notes

`LynxStage` and `LunaLynxStage` are **client-only**. They render `null` on the server and mount only after hydration.

## Bundle & Asset Conventions

- Bundle files must follow the naming pattern `*.web.bundle`
- `bundleBaseUrl` should end with a trailing slash: `"/bundles/"`, `"https://cdn.example.com/lynx/"`
- Resolved URL: `${bundleBaseUrl}${entry}.web.bundle`

## Transform Utilities

The functions in `src/utils/transform.ts` are zero-dependency pure functions, safe to copy into other projects.

| Function                                 | Description                                           |
| ---------------------------------------- | ----------------------------------------------------- |
| `computeScaleRange(input)`               | Returns `{ contain, cover }` scale factors            |
| `lerpFitScale(range, t)`                 | Interpolates between contain and cover                |
| `computeFrameOffset(input)`              | Returns `{ offsetX, offsetY }` for CSS transform      |
| `computeDepthScale(focalLength, worldZ)` | Perspective depth scale `f / (f - z)`                 |
| `computeScreenTranslation(input)`        | Projects world XY + screen pan into final translation |

To integrate fit/scale into a `lynx-view` container: copy `computeScaleRange`, `lerpFitScale`, and `computeFrameOffset`. Fix `lynx-view` at `baseWidth × baseHeight`, apply the computed transform via CSS, and pass design-baseline pixel dimensions to `browserConfig` rather than the container's measured size.
