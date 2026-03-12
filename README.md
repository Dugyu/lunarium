# Lynx Design

**Lynx Design** is a collection of design engineering examples, shared libraries, and exploratory projects built around the [**Lynx**] ecosystem.

It hosts:

- design language and principle explorations
- design engineering libraries
- interactive UI and graphics demonstrations
- experimental interface prototypes

The goal is to establish opinionated references for expressive, production-grade cross-platform interfaces with Lynx.

## Repository Structure

This repository is organized as a **monorepo**.

```
lynx-design
├─ projects/        # Conceptual projects and explorations
├─ apps/            # Runtime environments and interactive workspaces
├─ packages/        # Shared libraries
├─ tools/           # Repository tooling
```

To explore what's available, see the individual projects and apps below.

### projects/

`projects/` contains **conceptual projects and exploratory implementations** within the repository.
Projects may use libraries from `packages/` and applications from `apps/`.

Current projects include:

- [**L.U.N.A**](./projects/luna/README.md) – Lynx UI New Aesthetics (design language & theming system)
- [**MTC Color Picker**](./projects/mtc-color-picker/README.md) – Design research on ReactLynx Main Thread Components (MTC)

### apps/

`apps/` contains **runtime environments and interactive workspaces** for exploring or demonstrating UI capabilities.

Current apps include:

- **Studio** – a web workspace for composing themes for Lynx components, powered by Lynx for Web
- **Stage** – a Lynx runtime environment for rendering UI components on the device

### packages/

`packages/` contains **shared design engineering libraries** used across projects within this repository.
Some of these libraries are intended to be shared across the Lynx ecosystem (e.g. `lynx-ui`, `lynx-examples`, and `lynx-website`) to enhance the visual quality and interactivity of Lynx component libraries, examples, and documentation.

Typical examples include:

- theming primitives
- computational utilities for UI and graphics (e.g. geometry, animation, color, and shader effects)
- components for interaction and representation

## Development

If you are interested in contributing to Lynx Design, please refer to the [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

Lynx is licensed under the **Apache License 2.0**. You can find the full license details in the [LICENSE](./LICENSE) file.

[**Lynx**]: https://lynxjs.org
