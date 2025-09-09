# L.U.N.A Studio

**Studio** is the authoring environment in **L.U.N.A.rium**.

It provides editing, configuration, and orchestration over Lynx components.
By embedding a [**Stage**](../stage/README.md) instance through [**Lynx for Web**](https://lynxjs.org/guide/start/integrate-with-existing-apps.html#platform=web), Studio ensures that every authoring action is mirrored in live rendering, letting you design not in abstraction, but in reality.

> Lynx for Web implements the Lynx engine in web browsers.

## How to Explore

### Rsbuild Project

This is a [Rsbuild](https://rsbuild.rs) project.

Install the dependencies:

```bash
pnpm install
```

Start the dev server, and the app will be available at [http://localhost:3000](http://localhost:3000).

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
