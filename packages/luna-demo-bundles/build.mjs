// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { spawnSync } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const repoRoot = path.resolve(__dirname, '..', '..');
const outDir = path.join(__dirname, 'dist');

const STAGE_DIST_DIR = path.join(repoRoot, 'apps', 'stage', 'dist');
const STUDIO_PUBLIC_DIR = path.join(repoRoot, 'apps', 'studio', 'public');

async function pathExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function collectWebBundles(dir) {
  if (!(await pathExists(dir))) return [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.web.bundle'))
    .map((entry) => path.join(dir, entry.name));
}

function ensureStageDistBuiltIfNeeded() {
  return collectWebBundles(STAGE_DIST_DIR).then((bundles) => {
    if (bundles.length > 0) return;

    const result = spawnSync(
      'pnpm',
      ['-C', path.join(repoRoot, 'apps', 'stage'), 'build'],
      { stdio: 'inherit' },
    );

    if (result.error) {
      throw new Error(
        `Failed to run pnpm to build stage bundles (pnpm -C apps/stage build): ${result.error.message}`,
      );
    }

    if (result.signal) {
      throw new Error(
        `Stage bundles build was terminated by signal: ${result.signal}`,
      );
    }

    if (result.status !== 0) {
      throw new Error(
        `Failed to build stage bundles (pnpm -C apps/stage build), exit code: ${result.status}`,
      );
    }
  });
}

async function main() {
  await ensureStageDistBuiltIfNeeded();

  const [stageBundles, studioBundles] = await Promise.all([
    collectWebBundles(STAGE_DIST_DIR),
    collectWebBundles(STUDIO_PUBLIC_DIR),
  ]);

  const allBundles = [...stageBundles, ...studioBundles];
  if (allBundles.length === 0) {
    throw new Error(
      `No .web.bundle files found in ${STAGE_DIST_DIR} or ${STUDIO_PUBLIC_DIR}`,
    );
  }

  const usedNames = new Map();
  for (const absPath of allBundles) {
    const fileName = path.basename(absPath);
    const prev = usedNames.get(fileName);
    if (prev) {
      throw new Error(
        `Duplicate bundle filename "${fileName}" from:\n- ${prev}\n- ${absPath}\n`
          + 'Rename one of them or adjust the build to include a subdirectory.',
      );
    }
    usedNames.set(fileName, absPath);
  }

  await fs.rm(outDir, { recursive: true, force: true });
  await fs.mkdir(outDir, { recursive: true });

  await Promise.all(
    [...usedNames.entries()].map(async ([fileName, absPath]) => {
      await fs.copyFile(absPath, path.join(outDir, fileName));
    }),
  );

  process.stdout.write(
    `Copied ${usedNames.size} .web.bundle files into ${
      path.relative(repoRoot, outDir)
    }\n`,
  );
}

await main();
