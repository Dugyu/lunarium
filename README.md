# L.U.N.A.rium

The experimental realm of **Lynx UI New Aesthetics**, where tokens, variants, and anatomy shells take form before primitives land publicly.

**L.U.N.A.rium** is the theming laboratory of Lynx UI.

## Studio & Stage

Inside the **L.U.N.A** project, **Studio** and **Stage** form a dual orbit, authoring and rendering.

[**Studio**](./apps/studio/README.md) is the creative workspace — a **Web** app for composing, editing, and orchestrating Lynx components.

[**Stage**](./apps/stage/README.md) is the live runtime — a [**Lynx**](https://lynxjs.org/) app that renders components in their authentic execution environment.

The **Studio** carries an embedded **Stage** via [**Lynx for Web**](https://lynxjs.org/guide/start/integrate-with-existing-apps.html#platform=web), so every adjustment is instantly reflected in true runtime light — bridging design intent with lived experience.

## How to Explore

### Prerequisites

- Node.js **v22+** (or v24+)
- pnpm **v10+**

Install dependencies at the repo root:

```bash
pnpm install
```

### Explore Studio (Web app)

> **Recommended entry point** — Studio includes an embedded Stage instance via **Lynx for Web**, so you can design and preview components in one seamless environment.

End-to-end demo — build Stage, build Studio, and preview all in one command.

```
pnpm demo
```

If you prefer running it directly within the Studio app:

```
cd apps/studio
pnpm demo
```

→ [**See Studio Details ↗**](./apps/studio/README.md)

### Explore Stage (Lynx app)

> You can also run **Stage** standalone, though it's usually launched from **Studio**.

Renders Lynx components in their authentic execution environment.

```
pnpm stage:dev
```

Scan the QR code in the terminal with **LynxExplorer App**:

- [Android (GitHub Releases)](https://github.com/lynx-family/lynx/releases/latest)
- [iOS (App Store)](https://apps.apple.com/ca/app/lynx-go-dev-explorer/id6743227790)

Ensure your **desktop and mobile are on the same network**.

→ [**See Stage Details ↗**](./apps/stage/README.md)
