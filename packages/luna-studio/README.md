# luna-studio

`@dugyu/luna-studio` is the reusable choreography core extracted from `apps/studio`.

It packages the multi-stage layout and Lynx runtime wiring needed for:

- compare / focus / lineup stage arrangements
- shared theme application across multiple stages
- host-side stage interaction handling
- Lynx-to-host runtime callback forwarding

It does **not** currently ship the demo shell from `apps/studio`.

The app-local pieces stay outside this package for now:

- `Studio`
- `MenuBar`
- `StudioFrame`
- keyboard shortcut glue
- demo-specific runtime handling such as `MoonriseEvent`

If you only need a single device-framed preview, use [`@dugyu/luna-stage`](../luna-stage) directly.

## Installation

```sh
npm i @dugyu/luna-studio @dugyu/luna-stage motion react react-dom
```

`luna-studio` depends on `@dugyu/luna-stage` for its rendering primitives.

You still need the required Lynx side-effects at your application entry point. See the [Required Lynx Side-effects](../luna-stage#required-lynx-side-effects) section in the `luna-stage` README.

## What This Package Exports

Current public exports from `@dugyu/luna-studio`:

- `Choreography`
- `ChoreographyProps`
- `StageEntry`
- `StudioLayout`
- `StudioViewMode`
- `StageEvent`
- `StageEventType`
- `LynxRuntimeCall`
- `LunaThemeKey`
- `LunaThemeMode`
- `LunaThemeVariant`

`StudioLunaLynxStage` exists inside the package as an internal adapter, but it is **not** part of the public API yet.

## Quick Start

```tsx
import { Choreography } from '@dugyu/luna-studio';
import type { StudioLayout } from '@dugyu/luna-studio';

const layout: StudioLayout = {
  compare: [
    {
      id: 'button-light',
      className: 'flex-1 order-1',
      entry: 'ActButton',
      theme: 'luna-light',
      componentId: 'button',
    },
    {
      id: 'button-dark',
      className: 'flex-1 order-2',
      entry: 'ActButton',
      theme: 'luna-dark',
      componentId: 'button',
    },
  ],
  focus: [
    {
      id: 'button-focus',
      className: 'col-start-2 col-end-4 row-start-1 row-end-2',
      entry: 'ActButton',
      theme: 'luna-light',
      componentId: 'button',
    },
  ],
  lineup: [
    {
      id: 'button-lineup',
      className: 'col-start-2 col-end-3 row-start-1 row-end-2',
      entry: 'ActButton',
      theme: 'lunaris-dark',
      componentId: 'button',
    },
  ],
};

export function Demo() {
  return (
    <div className='size-full'>
      <Choreography
        layout={layout}
        viewMode='compare'
        themeVariant='lunaris'
        themeMode='dark'
      />
    </div>
  );
}
```

## Core Concepts

### `StageEntry`

`StageEntry` is the per-stage data boundary used by the choreography layer.

```ts
type StageEntry = {
  id: string;
  className: string;
  entry: string;
  theme: LunaThemeKey;
  componentId?: string;
} & Record<string, unknown>;
```

Notes:

- `id` is used as the React key and motion layout identifier.
- `className` controls the stage cell placement in the active layout.
- `entry` is the Lynx bundle entry rendered inside the stage.
- `theme` is used in `compare` mode.
- `componentId` is an optional app-defined focus identity.

### `StudioLayout`

`StudioLayout` contains one stage list for each built-in presentation mode.

```ts
type StudioLayout = Record<'compare' | 'focus' | 'lineup', StageEntry[]>;
```

### `StudioViewMode`

`StudioViewMode` selects which layout slice is active.

| Mode      | Behavior                                        |
| --------- | ----------------------------------------------- |
| `compare` | Shows multiple stages side-by-side              |
| `focus`   | Places stages into the perspective focus layout |
| `lineup`  | Places stages into the lineup grid              |

## Runtime And Interaction Hooks

### `onLynxRuntimeCall`

Receives generic runtime callbacks emitted from embedded Lynx content.

```ts
type LynxRuntimeCall = {
  entry: string;
  channel: string;
  name: string;
  data: unknown;
};
```

This keeps the package surface runtime-neutral:

- no `bridge` naming in the public API
- no low-level `moduleName` leak
- `channel` is the host-facing source identifier

### `onStageEvent`

Receives host-side interaction events from the outer Web stage container.

```ts
type StageEvent = {
  type: 'click' | 'pointerdown' | 'pointerup' | 'pointercancel';
  viewMode: StudioViewMode;
  stage: StageEntry;
  nativeEvent: MouseEvent | PointerEvent;
};
```

### `interactionTarget`

Controls where pointer interaction should land:

- `'lynx'`: Lynx content receives pointer interaction
- `'container'`: the outer Web stage container receives pointer interaction

Example:

```tsx
<Choreography
  layout={layout}
  viewMode='focus'
  interactionTarget='container'
  onStageEvent={(event) => {
    console.log(event.type, event.stage.id);
  }}
  onLynxRuntimeCall={(call) => {
    console.log(call.channel, call.name, call.data);
  }}
/>;
```

## `Choreography` API

`Choreography` is the main public component in this package.

```ts
type ChoreographyProps = {
  layout: StudioLayout;
  viewMode: StudioViewMode;
  className?: string;
  interactionTarget?: 'lynx' | 'container';
  onLynxRuntimeCall?: (call: LynxRuntimeCall) => unknown;
  onStageEvent?: (event: StageEvent) => void;
  themeVariant?: LunaThemeVariant;
  themeMode?: LunaThemeMode;
};
```

Behavior notes:

- `themeVariant` defaults to `'lunaris'`
- `themeMode` defaults to `'dark'`
- `interactionTarget` defaults to `'lynx'`
- `layout` is required and should already be fully resolved by the host app

## Scope Of This Extraction

This package currently covers the first extraction target described in `apps/feature-design-spec.md`:

- define public choreography types
- make `DynamicView` layout-driven
- move choreography and the Lynx runtime adapter into `packages/luna-studio`
- make `apps/studio` consume the extracted package

This package does **not** yet provide:

- a top-level `Studio` shell component
- built-in demo layout data
- app chrome such as `MenuBar`
- app-level keyboard bindings
- demo-specific runtime event parsing
- a public `lynx-stage` subpath export

## Intended Consumers

Use `@dugyu/luna-studio` when you need a reusable multi-stage choreography layer but want to keep your app shell, data, and event handling local:

- documentation sites embedding multiple Lynx entries
- design system comparison canvases
- host apps that need both Web-side stage events and Lynx runtime callbacks
- future `lynx-website` integration
