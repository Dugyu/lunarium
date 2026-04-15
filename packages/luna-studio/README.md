# luna-studio

> A multi-stage orchestration terminal built on `@dugyu/luna-stage` — for component library showcases, design system comparisons, and recording-ready layouts.

Use `luna-studio` when you need side-by-side comparison, focus/lineup switching, or a structured presentation environment. For single-frame previews, use [`@dugyu/luna-stage`](../luna-stage) directly.

## Installation

```sh
npm i @dugyu/luna-studio @dugyu/luna-stage
```

**Peer dependencies:**

```sh
npm i react
```

`luna-studio` depends on `luna-stage` for its rendering primitives. You still need to register the Lynx side-effects at your application entry point — see the [Required Lynx Side-effects](../luna-stage#required-lynx-side-effects) section in the `luna-stage` README.

---

## Quick Start

```tsx
import { Studio } from '@dugyu/luna-studio';

export default function App() {
  return (
    <Studio
      bundleBaseUrl='/bundles/'
      recordMode={false}
    />
  );
}
```

- **`bundleBaseUrl`** — forwarded to each `LunaLynxStage` in the composition; follows the same convention as `luna-stage`.
- **`recordMode`** — adds layout padding and disables UI chrome so the canvas is clean for screen recording or export.
- **`stages` / `layouts`** — pass custom stage configurations and layout specs to override the built-in defaults.

## Choreography (Advanced)

`Choreography` and `DynamicView` are the two layers that power Studio's multi-stage layout:

- **`Choreography`** — the orchestration entry point. Manages which stages are active, owns the view mode state, and handles theme sync and events.
- **`DynamicView`** — the rendering and animation layer. Reads the current `StudioViewMode` and positions / animates the stage cells accordingly.

```text
Choreography (state + orchestration)
  └── DynamicView (layout + animation)
        └── MotionContainer → MotionPresentation → MotionMockup → LunaLynxStage
```

### View modes

`StudioViewMode` controls the layout strategy applied by `DynamicView`:

| Mode      | Behavior                                         |
| --------- | ------------------------------------------------ |
| `compare` | All stages visible side-by-side at reduced scale |
| `focus`   | Single stage fills the canvas                    |
| `lineup`  | Stages arranged in a horizontal strip            |

### Theme events

If `onThemeModeChange` is wired up, `Choreography` propagates theme mode transitions across all active stages simultaneously.

## Default Data

`STAGES` and `BASE_STATUS` are the built-in example configurations used by `Studio` when no `stages` or `layouts` prop is provided.

- They are intentionally minimal — suitable for internal demos and quick exploration.
- **Do not modify them directly.** Override by passing your own `stages` / `layouts` to `Studio` or `Choreography`.

```ts
import { Studio, STAGES } from '@dugyu/luna-studio';

const myStages = STAGES.map(s => ({
  ...s,
  bundleBaseUrl: 'https://cdn.example.com/',
}));

<Studio stages={myStages} bundleBaseUrl='https://cdn.example.com/' />;
```

---

## UI Components

### `MenuBar`

Renders the view mode switcher (`compare` / `focus` / `lineup`). Requires icon assets — see the package's peer dependency notes for icon resolution.

### `StudioFrame`

The outermost layout container. Handles canvas sizing, background, and recording padding (activated by `recordMode`). Nest `Choreography` inside it when composing manually.

---

## API Surface

### Components

| Export         | Description                                  |
| -------------- | -------------------------------------------- |
| `Studio`       | Top-level assembly — the default entry point |
| `Choreography` | Multi-stage orchestration container          |
| `DynamicView`  | Layout and animation renderer                |
| `MenuBar`      | View mode switching UI                       |
| `StudioFrame`  | Canvas container with recording-mode support |

### Props

| Type                | Description              |
| ------------------- | ------------------------ |
| `StudioProps`       | Props for `Studio`       |
| `ChoreographyProps` | Props for `Choreography` |
| `DynamicViewProps`  | Props for `DynamicView`  |

### Data & Config

| Export        | Description                                    |
| ------------- | ---------------------------------------------- |
| `STAGES`      | Default stage configuration array              |
| `BASE_STATUS` | Default view status (active mode, theme state) |
| `StageMeta`   | Type describing a single stage entry           |
| `ViewSpec`    | Type describing a layout configuration         |

---

## Who Should Use This?

`luna-studio` is a **terminal consumer** package — it assembles all lower layers into a ready-to-use presentation environment.

- Internal design system studios
- Component library documentation demos
- Multi-variant / multi-theme comparison views
- Screen recording layouts

If you only need a single device-framed preview, reach for `@dugyu/luna-stage` instead — it has no Studio overhead and a smaller API surface.
