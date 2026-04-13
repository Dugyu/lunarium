# Contributing

## Developing

### Requirements

_Node.js_

- Node.js **v24+** (or v22+). Check with `node -v`.

_pnpm_

- pnpm **v10+**. This repo uses `corepack` + the `packageManager` field in `package.json`.

Enable pnpm via Corepack:

```sh
corepack enable
```

### Setup

Install dependencies:

```bash
pnpm install
```

### Building

**Full workspace build (recommended before running apps/tests)**

```sh
pnpm turbo build
```

**Build a specific app**

```sh
pnpm stage:build
pnpm studio:build
```

**Build a specific package**

```sh
pnpm turbo run build --filter ./packages/core
```

### Running apps

LUNA Studio end-to-end demo (recommended)

Build Stage → build Studio → preview:

```sh
pnpm demo
```

Develop LUNA Studio

```sh
pnpm studio:dev
```

Develop LUNA Stage (standalone)

```sh
pnpm stage:dev
```

### Explore Projects

#### MTC Color Picker (`projects/mtc-color-picker`)

```sh
pnpm --filter mtc-color-picker demo
```

For details, see `projects/mtc-color-picker/README.md`.

### Linting / Formatting / Tests

#### Lint

```sh
pnpm lint:eslint
```

You can run eslint's auto-fix via:

```sh
pnpm lint:eslint:fix
```

#### Formatting

We use [dprint](https://dprint.dev/install/) for formatting:

```sh
pnpm format
```

Check formatting in CI-style mode:

```sh
pnpm format:check
```

## Submitting

### Pre-submit (recommended)

Run the one-shot fixer before opening a PR:

```sh
pnpm fix:all
```

This runs formatting (`pnpm format`) and also fixes common workspace hygiene issues (Manypkg + Sherif).

### Code formatting

We use [dprint](https://dprint.dev/install/) for automatic code formatting to maintain a consistent style.
Please ensure your code is formatted prior to submitting.

```sh
pnpm format
```

### Generating changesets

We use [🦋 changesets](https://github.com/changesets/changesets) to manage versioning and changelogs.
Usually, you should add a changeset for user-facing changes:

```sh
pnpm changeset
```

Commit the generated `.md` file in `.changeset/` and open a PR.
