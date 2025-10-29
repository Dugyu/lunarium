# L.U.N.A Studio

**Studio** is the authoring environment in [**L.U.N.A.rium**](../../README.md).

It provides editing, configuration, and orchestration over Lynx components.
By embedding a [**Stage**](../stage/README.md) instance through [**Lynx for Web**](https://lynxjs.org/guide/start/integrate-with-existing-apps.html#platform=web), Studio ensures that every authoring action is mirrored in live rendering, letting you design not in abstraction, but in reality.

> Lynx for Web implements the Lynx engine in web browsers.

## How to Explore

### Rsbuild Project

This is a [Rsbuild](https://rsbuild.rs) project.

### Requirements

- Node.js **v22+** (or v24+)
- pnpm **v10+**
- A sibling [**Stage**](../stage/README.md) app at `../stage` (this repo layout)

### Install

Install the dependencies:

```bash
pnpm install
```

### Run Demo (Recommended)

`demo` will **build the Stage app first**, then build Studio, and finally launch a local preview.

```bash
pnpm demo
```

This runs the following script:

```json
{
  "scripts": {
    "demo": "pnpm --filter ../stage build && cross-env rsbuild --config ./rsbuild.config.ts build && rsbuild preview"
  }
}
```

### Develop Studio Only

If you're iterating on Studio UI (and you already built Stage once), you can use the dev server, and the app will be available at [http://localhost:3000](http://localhost:3000):

```bash
pnpm dev
```

Build the app for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

### Scripts Reference

- `demo`: Build **Stage** → Build **Studio** → Preview (end-to-end).

- `build`: Build **Stag**e → Build **Studio** (no preview).

- `dev`: **Studio** dev server (does not rebuild **Stage** automatically).

- `preview`: Preview the last **Studio** production build (does not rebuild **Stage** automatically).

```json
{
  "scripts": {
    "demo": "pnpm --filter ../stage build && cross-env rsbuild --config ./rsbuild.config.ts build && rsbuild preview",
    "build": "pnpm --filter ../stage build && cross-env rsbuild --config ./rsbuild.config.ts build",
    "dev": "rsbuild dev --open",
    "preview": "rsbuild preview"
  }
}
```
