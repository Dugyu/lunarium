# luna-studio

`@dugyu/luna-studio` is the reusable multi-stage choreography layer extracted from `apps/studio`.

It packages the rendering, layout, focus, and interaction plumbing needed for:

- compare / focus / lineup stage arrangements
- shared or per-stage theme application
- host-side stage-container interaction handling
- embedded Lynx runtime callback forwarding
- app-defined focus resolution and global-props injection

It does **not** ship the app shell from `apps/studio`.

The app-local pieces stay outside this package:

- `Studio`
- `MenuBar`
- `StudioFrame`
- keyboard shortcut glue
- demo-specific runtime handling
- app-owned layout catalogs and business metadata

If you only need a single device-framed preview, use [`@dugyu/luna-stage`](../luna-stage) directly.

## Installation

```sh
npm i @dugyu/luna-studio @lynx-js/web-core motion react react-dom
```

`luna-studio` depends on `@dugyu/luna-stage` internally for its rendering primitives and expects the Lynx Web runtime to be available through `@lynx-js/web-core`.

## Public API

Current public exports from `@dugyu/luna-studio` are grouped by components and types:

- Components
  - `Choreography`
- Studio model types
  - `StudioStage`
  - `StageGlobalPropsBuilder`
  - `StudioGridSpec`
  - `StudioLayout`
  - `StudioModeGrid`
  - `StudioViewMode`
  - `LunaThemeKey`
  - `LunaThemeMode`
  - `LunaThemeVariant`
- Choreography types
  - `ChoreographyBaseProps`
  - `ChoreographyProps`
  - `ChoreographyInteractionProps`
  - `ChoreographyViewProps`
  - `InteractionParams`
  - `InteractionTarget`
  - `FocusKeyResolver`
- Lynx bridge types
  - `LynxRuntimeCall`

`ChoreographyView` and `StudioLynxStage` exist inside the package as internal implementation layers, but they are not part of the public component API.

## Quick Start

```tsx
import { Choreography } from '@dugyu/luna-studio';
import type { StudioLayout, StudioModeGrid } from '@dugyu/luna-studio';

const modeGrid: StudioModeGrid = {
  compare: { cols: 2, rows: 1 },
  focus: { cols: 3, rows: 1 },
  lineup: { cols: 3, rows: 1 },
};

const layout: StudioLayout = {
  compare: [
    {
      id: 'button-light',
      entry: 'ActButton',
      theme: 'luna-light',
      focusKey: 'button',
      style: { gridColumn: '1 / span 1', gridRow: '1 / span 1' },
    },
    {
      id: 'button-dark',
      entry: 'ActButton',
      theme: 'luna-dark',
      focusKey: 'button',
      style: { gridColumn: '2 / span 1', gridRow: '1 / span 1' },
    },
  ],
  focus: [
    {
      id: 'button-focus',
      entry: 'ActButton',
      theme: 'luna-light',
      focusKey: 'button',
      style: { gridColumn: '2 / span 1', gridRow: '1 / span 1' },
    },
  ],
  lineup: [
    {
      id: 'button-lineup',
      entry: 'ActButton',
      theme: 'lunaris-dark',
      focusKey: 'button',
      style: { gridColumn: '2 / span 1', gridRow: '1 / span 1' },
    },
  ],
};

export function Demo() {
  return (
    <div className='size-full'>
      <Choreography
        bundleBaseUrl='/bundles/'
        layout={layout}
        modeGrid={modeGrid}
        viewMode='compare'
        themeVariant='lunaris'
        themeMode='dark'
        interactionTarget='content'
      />
    </div>
  );
}
```

## Core Concepts

### `StudioStage`

`StudioStage` is the per-stage data boundary consumed by the choreography layer.

```ts
type StudioStage = {
  id: string;
  className?: string;
  style?: CSSProperties;
  bundleBaseUrl?: string;
  focusKey?: string;
  entry: string;
  theme: LunaThemeKey;
};
```

Notes:

- `id` is the stable stage identity used for layout, motion, and interaction correlation.
- `className` and `style` apply to the stage container.
- `bundleBaseUrl` optionally overrides the choreography-level default bundle base URL for this stage.
- `focusKey` is an optional stage-level focus identity and should already be resolved by the host before rendering `Choreography`.
- `entry` is the Lynx bundle entry rendered inside the stage.
- `theme` is used directly in `compare` mode.
- app-specific metadata should live in app-local extension types rather than reopening the public `StudioStage` contract.

### `StudioLayout`

`StudioLayout` contains one stage list for each built-in presentation mode.

```ts
type StudioLayout = Record<'compare' | 'focus' | 'lineup', StudioStage[]>;
```

`modeGrid` can optionally provide the grid dimensions for each mode when the host wants the container layout to be grid-driven.

### `StudioViewMode`

`StudioViewMode` selects which layout slice is active.

| Mode      | Behavior                                                        |
| --------- | --------------------------------------------------------------- |
| `compare` | Renders multiple stages side-by-side and allows per-stage theme |
| `focus`   | Renders a shared theme with 3D focal emphasis                   |
| `lineup`  | Renders a shared theme in the lineup arrangement                |

## Interaction Model

### `InteractionParams`

`InteractionParams` is the normalized interaction envelope used by choreography callbacks.

```ts
type InteractionParams =
  | {
    target: 'stage';
    stageId: string;
    entry: string;
    payload?: unknown;
    containerEvent: MouseEvent | PointerEvent;
  }
  | {
    target: 'content';
    stageId: string;
    entry: string;
    payload?: unknown;
    runtimeCall: LynxRuntimeCall;
  };
```

Notes:

- `target: 'stage'` means the interaction is attributed to the host-side stage layer; the raw browser payload is exposed as `containerEvent`.
- `target: 'content'` means the interaction is attributed to embedded Lynx content; the raw Lynx runtime payload is exposed as `runtimeCall`.
- `containerEvent.type` distinguishes host-side click / pointer variants.
- `runtimeCall.name` distinguishes content-side interaction kinds emitted through `onNativeModulesCall`.

### `interactionTarget`

`interactionTarget` controls which layer receives pointer interaction first:

- `'content'`: embedded Lynx content is interactive
- `'stage'`: the outer stage container is interactive

### `onInteraction`

Receives the normalized choreography interaction envelope.

```ts
type OnInteraction = (interaction: InteractionParams) => unknown;
```

Use this as the primary high-level callback when you want one place to observe both host-side stage-container interactions and embedded-content runtime callbacks. The concrete raw payload is available as `interaction.containerEvent` or `interaction.runtimeCall`, depending on `interaction.target`.

### `onLynxRuntimeCall`

Receives raw runtime callbacks emitted from embedded Lynx content.

```ts
type OnLynxRuntimeCall = (call: LynxRuntimeCall) => unknown;

type LynxRuntimeCall = {
  entry: string;
  channel: string;
  name: string;
  data: unknown;
};
```

Use this only when you need the original Lynx bridge / RPC callback directly, rather than the normalized `onInteraction` abstraction.

This keeps the package surface runtime-neutral:

- no low-level `moduleName` leak
- `channel` remains the host-facing source identifier
- app-specific interpretation stays outside the package

### `resolveFocusKey`

`resolveFocusKey` maps a normalized interaction back to a stage-level `focusKey`.

```ts
type FocusKeyResolver = (
  interaction: InteractionParams,
) => string | undefined;
```

This is the app-owned bridge between generic choreography interactions and business-specific focus semantics.

### `buildStageGlobalProps`

`buildStageGlobalProps` lets the host derive app-specific Lynx global props for each rendered stage.

```ts
type StageGlobalPropsBuilder = (params: {
  stage: StudioStage;
  viewMode: StudioViewMode;
  activeFocusKey: string;
  focusKey: string | undefined;
}) => Record<string, unknown> | undefined;
```

The two focus-related fields serve different roles:

- `activeFocusKey` is the current choreography-wide active focus identity.
- `focusKey` is the focus identity of the specific `stage` currently being rendered.

In other words, `activeFocusKey` answers "which focus target is currently active?", while `focusKey` answers "which focus target does this particular stage belong to?".

This makes it easy to derive stage-local props such as:

- whether the current stage is the active/focused stage
- which shared component or semantic key is currently active elsewhere in the choreography
- app-specific flags that depend on both the rendered stage and the global focus state

## `Choreography` API

`Choreography` is the main public component in this package.

Internally it wraps `ChoreographyView`, which is the lower-level renderer responsible for layout, focus state, interaction normalization, and Lynx-stage wiring.

```ts
type ChoreographyProps = Omit<ChoreographyViewProps, 'mode'> & {
  viewMode?: StudioViewMode;
};
```

Behavior notes:

- `viewMode` defaults to `'compare'`
- `themeVariant` defaults to `'lunaris'`
- `themeMode` defaults to `'dark'`
- `interactionTarget` defaults to `'content'`
- `focusKey` is read directly from each `StudioStage`
- `bundleBaseUrl` can provide a choreography-level default, and `StudioStage.bundleBaseUrl` can override it per stage
- `layout` is required and should already be fully resolved by the host app

## Scope Of This Extraction

This package currently covers the reusable choreography layer:

- public choreography types and data model
- grid-driven multi-stage layout and focus presentation
- normalized stage/content interaction handling
- the internal `ChoreographyView` renderer
- the internal Lynx runtime adapter used by `Choreography`

This package does **not** currently provide:

- a top-level `Studio` shell component
- built-in demo layout data
- app chrome such as `MenuBar`
- app-level keyboard bindings
- demo-specific runtime event parsing
- a public `lynx-stage` subpath export

## Intended Consumers

Use `@dugyu/luna-studio` when you need a reusable multi-stage choreography layer but want to keep your app shell, layout data, business semantics, and event handling local:

- documentation sites embedding multiple Lynx entries
- design system comparison canvases
- host apps that need both stage-container interactions and Lynx runtime callbacks
- future `lynx-website` integration
