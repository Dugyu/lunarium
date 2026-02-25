#!/usr/bin/env node

// bootstrap-package
// Generate a minimal placeholder package (v0.0.0-oidc-bootstrap.0) for initial npm publish
// prior to OIDC Trusted Publisher setup.
//
// Reads name/description from the source package.json
// and emits a publishable skeleton into the output directory.

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_OUT = path.join(__dirname, 'output');
const LICENSE_PATH = path.join(__dirname, '..', '..', 'LICENSE');

function formatDefaultOutHelp() {
  const cwd = process.cwd();
  const rel = path.relative(cwd, DEFAULT_OUT);
  return rel && !rel.startsWith('..') ? rel : DEFAULT_OUT;
}

const HELP = `
bootstrap-package — create a minimal placeholder package for initial npm publish.

This script creates a minimal placeholder package (v0.0.0-oidc-bootstrap.0) to enable OIDC Trusted Publisher setup
for subsequent automated releases.

Usage:
  pnpm bootstrap:package <packages/<pkg>> [options]

Options:
  --out <dir>   Output root directory (default: ${formatDefaultOutHelp()})
  --dry-run     Preview actions without writing anything
  --force       Overwrite existing output directory
  -h, --help    Show this help

Examples:
  pnpm bootstrap:package packages/tokens
  pnpm bootstrap:package packages/tokens --dry-run
  pnpm bootstrap:package packages/tokens --force
`.trimStart();

// ---------------------------------------------------------------------------
// Argument parsing
// ---------------------------------------------------------------------------

function parseArguments() {
  const options = {
    help: { type: 'boolean', short: 'h' },
    'dry-run': { type: 'boolean' },
    force: { type: 'boolean' },
    out: { type: 'string', default: DEFAULT_OUT },
  };

  try {
    const { values, positionals } = parseArgs({
      options,
      allowPositionals: true,
    });

    return {
      help: values.help,
      dryRun: values['dry-run'],
      force: values.force,
      out: path.resolve(values.out),
      input: positionals[0] ?? null,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function safeFolderName(pkgName) {
  return String(pkgName).replace(/^@/, '').replaceAll('/', '__');
}

function toJson(obj) {
  return JSON.stringify(obj, null, 2) + '\n';
}

function ensureTrailingNewline(s) {
  return s.endsWith('\n') ? s : s + '\n';
}

function ensureWritable(dir) {
  try {
    fs.accessSync(dir, fs.constants.W_OK);
  } catch {
    throw new Error(`Directory not writable: ${dir}`);
  }
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function validate(inputDir, srcPkgJsonPath) {
  if (!fs.existsSync(inputDir) || !fs.statSync(inputDir).isDirectory()) {
    throw new Error(`Input directory not found: ${inputDir}`);
  }
  if (!fs.existsSync(srcPkgJsonPath)) {
    throw new Error(`package.json not found: ${srcPkgJsonPath}`);
  }
  if (!fs.existsSync(LICENSE_PATH)) {
    throw new Error(`LICENSE not found at: ${LICENSE_PATH}`);
  }
}

// ---------------------------------------------------------------------------
// Manifest builder
// ---------------------------------------------------------------------------

function buildManifest(name, description) {
  const baseDesc = (description ?? '').trim();
  const finalDesc = baseDesc
    ? `${baseDesc} (OIDC bootstrap placeholder)`
    : 'Placeholder package published only to enable npm Trusted Publishing (OIDC) setup.';

  const pkgJson = {
    name,
    version: '0.0.0-oidc-bootstrap.0',
    description: finalDesc,
    license: 'Apache-2.0',
    author: 'The Lynx Authors',
    files: ['README.md', 'LICENSE'],
  };

  const quote = baseDesc ? `\n> ${baseDesc}\n` : '';

  const readmeText = ensureTrailingNewline(
    `# ${name}${quote}

> ${finalDesc}

This is a placeholder package published only to enable npm Trusted Publishing (OIDC) setup.

It contains no functional code and should not be installed.

A proper release will replace this package once OIDC is configured.
`,
  );
  const licenseText = ensureTrailingNewline(
    fs.readFileSync(LICENSE_PATH, 'utf8'),
  );

  return [
    { relativePath: 'package.json', content: toJson(pkgJson) },
    {
      relativePath: 'README.md',
      content: readmeText,
    },
    { relativePath: 'LICENSE', content: licenseText },
  ];
}

// ---------------------------------------------------------------------------
// Write to disk
// ---------------------------------------------------------------------------

function writeManifest(outDir, manifest, { force }) {
  if (fs.existsSync(outDir)) {
    if (!force) {
      throw new Error(
        `Output already exists: ${outDir}\nUse --force to overwrite, or delete it manually.`,
      );
    }
    fs.rmSync(outDir, { recursive: true, force: true });
  }

  // Ensure parent directory is writable
  const parentDir = path.dirname(outDir);
  if (!fs.existsSync(parentDir)) {
    fs.mkdirSync(parentDir, { recursive: true });
  }
  ensureWritable(parentDir);

  fs.mkdirSync(outDir, { recursive: true });

  for (const { relativePath, content } of manifest) {
    fs.writeFileSync(path.join(outDir, relativePath), content);
  }
}

// ---------------------------------------------------------------------------
// Logging
// ---------------------------------------------------------------------------

function printSummary(
  repoRoot,
  inputDir,
  name,
  description,
  outDir,
  manifest,
  { dryRun, force },
) {
  const inputRel = path.relative(repoRoot, inputDir);
  const outDirRel = path.relative(repoRoot, outDir);

  console.log('bootstrap-package');
  console.log(`  input:  ${inputRel}`);
  console.log(`  name:   ${name}`);
  console.log(`  desc:   ${description || '(none)'}`);
  console.log(`  output: ${outDirRel}`);
  console.log(
    `  mode:   ${dryRun ? 'dry-run' : 'write'}${force ? ' +force' : ''}`,
  );
  console.log();

  console.log('Files:');
  for (const { relativePath } of manifest) {
    console.log(`  ${outDirRel}/${relativePath}`);
  }
  console.log();

  if (dryRun) {
    const pkgEntry = manifest.find((m) => m.relativePath === 'package.json');
    if (pkgEntry) {
      console.log('--- package.json (preview) ---');
      console.log(pkgEntry.content);
    }
  }
}

function printNextSteps(repoRoot, outDir) {
  const outDirRel = path.relative(repoRoot, outDir);
  console.log('Next steps:');
  console.log(`  cd ${outDirRel}`);
  console.log('  npm publish --access public --tag oidc-bootstrap');
  console.log();
  console.log('After publish:');
  console.log(
    '  1. Configure Trusted Publisher on npmjs.com (bind repo + workflow filename).',
  );
  console.log('  2. Delete the output folder — it is no longer needed.');
  console.log(
    '  3. Future releases will use OIDC Trusted Publishing automatically.',
  );
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const { help, dryRun, force, out, input } = parseArguments();

  if (help || !input) {
    process.stdout.write(HELP);
    process.exit(help ? 0 : 1);
  }

  const repoRoot = process.cwd();
  const inputDir = path.resolve(repoRoot, input);
  const srcPkgJsonPath = path.join(inputDir, 'package.json');

  validate(inputDir, srcPkgJsonPath);

  const srcPkg = readJson(srcPkgJsonPath);
  const name = srcPkg?.name;
  if (!name || typeof name !== 'string') {
    throw new Error(`Missing or invalid "name" in ${srcPkgJsonPath}`);
  }

  // Validate package name according to npm rules
  if (!/^(?:@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(name)) {
    throw new Error(`Invalid package name: ${name}`);
  }

  if (!name.startsWith('@')) {
    console.error();
    console.error(
      '❌  \u001B[31mError: Package name must be scoped (e.g. @scope/pkg).\u001B[0m',
    );
    console.error(`    Found: ${name}`);
    console.error();
    process.exit(1);
  }

  const description = (srcPkg?.description ?? '').trim();
  const outDir = path.join(out, safeFolderName(name));
  const manifest = buildManifest(name, description);

  printSummary(repoRoot, inputDir, name, description, outDir, manifest, {
    dryRun,
    force,
  });

  if (!dryRun) {
    // Ensure output root directory exists and is writable
    if (!fs.existsSync(out)) {
      console.log(`Creating output directory: ${out}`);
      fs.mkdirSync(out, { recursive: true });
    }
    ensureWritable(out);

    writeManifest(outDir, manifest, { force });
    console.log('Done.\n');
  }

  printNextSteps(repoRoot, outDir);
}

try {
  main();
} catch (err) {
  console.error('Error:', err?.message ?? err);
  process.exit(1);
}
