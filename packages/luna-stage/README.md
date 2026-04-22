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

For motion capabilities, motion is an optional peer dependency:

```sh
pnpm i motion
```

## Required Lynx Side-effects

Add the following imports at your application entry point. These register the Lynx web components and inject required CSS — they must run before any `LynxStage` or `LunaLynxStage` is mounted.

```ts
import '@lynx-js/web-core/client';
```

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

## Motion (Optional)

`MotionMockup`, `MotionContainer`, and `MotionPresentation` layer layout transitions, perspective transforms, and fit/zoom/pan behavior on top of the base stage. They are opt-in — use them only when animated presentation is needed.

```tsx
import { MotionMockup, LunaLynxStage } from '@dugyu/luna-stage';

<MotionMockup>
  <LunaLynxStage entry='my-component' bundleBaseUrl='/bundles/' />
</MotionMockup>;
```

> **Note:** Motion components set `will-change: transform` and suppress `pointer-events` during transitions. Avoid nesting interactive content that relies on pointer events firing mid-animation.

## API Surface

### Components

| Component            | Description                                 |
| -------------------- | ------------------------------------------- |
| `Mockup`             | Device shell — renders the phone frame      |
| `MockupContainer`    | Unstyled container for custom shell layouts |
| `LynxStage`          | Core Lynx bundle renderer (no LUNA globals) |
| `LunaLynxStage`      | `LynxStage` + LUNA theme prop injection     |
| `MotionMockup`       | `Mockup` with perspective / fit-zoom-pan    |
| `MotionContainer`    | Per-cell animation wrapper                  |
| `MotionPresentation` | Enter / exit transition orchestrator        |

### Hooks & Utilities

| Export                      | Description                                          |
| --------------------------- | ---------------------------------------------------- |
| `useContainerResize`        | Observes container dimensions for responsive scaling |
| `useMergedRefs`             | Merges multiple refs onto a single element           |
| `useIsomorphicLayoutEffect` | SSR-safe `useLayoutEffect`                           |
| `cn`                        | Class name utility                                   |

### Types

| Type                 | Description                              |
| -------------------- | ---------------------------------------- |
| `LynxStageProps`     | Props for `LynxStage`                    |
| `LunaLynxStageProps` | Props for `LunaLynxStage`                |
| `MoonriseEvent`      | Lynx → host bridge event type            |
| `StudioViewMode`     | Re-export from `luna-studio`             |
| `LunaThemeKey`       | Re-export: theme family identifier       |
| `LunaThemeVariant`   | Re-export: variant within a theme family |
| `LunaThemeMode`      | Re-export: `light` \| `dark` \| `auto`   |

## SSR / SSG Notes

`LynxStage` and `LunaLynxStage` are **client-only**. They render `null` on the server and mount only after hydration. No server-side Lynx runtime is involved.

If you use Next.js or a similar SSR framework, import them with dynamic loading and `ssr: false`:

```ts
const LunaLynxStage = dynamic(
  () => import('@dugyu/luna-stage').then(m => m.LunaLynxStage),
  { ssr: false },
);
```

## Bundle & Asset Conventions

- Bundle files must follow the naming pattern `*.web.bundle`.
- `bundleBaseUrl` should end with a trailing slash: `"/bundles/"`, `"https://cdn.example.com/lynx/"`.
- For CDN or sub-path deployments, set `bundleBaseUrl` to the fully-qualified base URL of your bundle output directory.
- The resolved URL for a given `entry` is: `${bundleBaseUrl}${entry}.web.bundle`.
