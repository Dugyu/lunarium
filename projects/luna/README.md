# L.U.N.A

**L.U.N.A** (Lynx UI New Aesthetics) is the design language and theming system developed for the Lynx ecosystem.

This document serves as the **project entry for L.U.N.A** within the [**lynx-design**] monorepo.

## Studio & Stage

Inside the **L.U.N.A** project, [**Studio**] and [**Stage**] form a dual orbit, authoring and rendering.

> Naming Notes: The dots in **L.U.N.A** are purely visual. The name ends without the last dot to suggest openness.

[**Studio**] is the creative workspace — a **Web** app for composing, editing, and orchestrating Lynx components.

[**Stage**] is the live runtime — a [**Lynx**] app that renders components in their authentic execution environment.

The [**Studio**] carries an embedded [**Stage**] via [**Lynx for Web**], so every adjustment is instantly reflected in true runtime light — bridging design intent with lived experience.

## How to Explore

### Prerequisites

- Node.js **v24+** (or v22+)
- pnpm **v10+**

To get started, install dependencies and build all workspace packages:

```bash
pnpm install
pnpm turbo build
```

Once completed, you can explore the apps:

### Explore Studio (Web app)

> **Recommended entry point** — Studio includes an embedded Stage instance via **Lynx for Web**, so you can design and preview components in one seamless environment.

End-to-end demo — build Stage, build Studio, and preview all in one command.

```bash
pnpm demo
```

If you prefer running it directly within the Studio app:

```bash
cd apps/studio
pnpm demo
```

→ [**See Studio Details ↗**](../../apps/studio/README.md)

### Explore Stage (Lynx app)

> You can also run **Stage** standalone, though it's usually launched from **Studio**.

Renders Lynx components in their authentic execution environment.

```bash
pnpm stage:dev
```

If you prefer running it directly within the Stage app:

```bash
cd apps/stage
pnpm dev
```

Scan the QR code in the terminal with **LynxExplorer App**:

- [Android (GitHub Releases)](https://github.com/lynx-family/lynx/releases/latest)
- [iOS (App Store)](https://apps.apple.com/ca/app/lynx-go-dev-explorer/id6743227790)

Ensure your **desktop and mobile are on the same network**.

→ [**See Stage Details ↗**](../../apps/stage/README.md)

## Libraries

L.U.N.A is built on a collection of reusable libraries within the monorepo.

Key modules include:

- **Theme tokens**
  `packages/tokens`

- **Core theme utilities**
  `packages/core`

- **ReactLynx theming runtime**
  `packages/reactlynx`

- **Style in CSS**
  `packages/styles`

- **Tailwind preset**
  `packages/tailwind`

These libraries provide the infrastructure for building and experimenting with Lynx UI themes.

## Role in Lynx Design

Within the [**lynx-design**] monorepo, L.U.N.A represents the **design language layer** of the ecosystem.

It works together with other projects (such as UI experiments and interaction prototypes) to explore how Lynx can support richer UI expression and design-engineering workflows.

[**lynx-design**]: ../../README.md
[**Studio**]: ../../apps/studio/README.md
[**Stage**]: ../../apps/stage/README.md
[**Lynx**]: https://lynxjs.org/
[**Lynx for Web**]: https://lynxjs.org/guide/start/integrate-with-existing-apps.html#platform=web
