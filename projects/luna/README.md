# L.U.N.A.rium (LUNA)

L.U.N.A.rium is the theming laboratory of Lynx UI — a place where tokens, variants, and anatomy shells take form before primitives land publicly.

This document is the project entry for **LUNA** under `lynx-design/projects/luna`.

## Where the code lives (current)

Short-term, Luna’s code is still located at the repository root:

- Apps: `apps/studio`, `apps/stage`
- Libraries: `packages/*` (e.g. `packages/core`, `packages/tokens`, `packages/styles`, `packages/reactlynx`)

This README exists to provide a stable “project home” under `projects/` while the code layout evolves.

## Apps

- [Studio (Web)](../../apps/studio/README.md) (`apps/studio`)
- [Stage (Lynx)](../../apps/stage/README.md) (`apps/stage`)

## Libraries (selected)

- [Theme tokens](../../packages/tokens) (`packages/tokens`)
- [Core theme utilities](../../packages/core) (`packages/core`)
- [ReactLynx theming runtime](../../packages/reactlynx) (`packages/reactlynx`)
- [Styles (CSS generation)](../../packages/styles) (`packages/styles`)
- [Tailwind helpers](../../packages/tailwind) (`packages/tailwind`)

## Run

From repo root:

```bash
pnpm install
pnpm turbo build

# Studio (recommended)
pnpm demo

# Stage (standalone)
pnpm stage:dev
```

## Roadmap (structure)

- `apps/luna/*` may gradually move under `projects/luna`.
- `packages/*` will remain top-level and be consumed by `projects/*` (one-way: projects -> packages).
