import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

function die(message) {
  process.stderr.write(String(message) + '\n');
  process.exit(1);
}

function run(cmd, args, opts = {}) {
  const res = spawnSync(cmd, args, { stdio: 'inherit', ...opts });
  if (res.status !== 0) {
    process.exit(res.status ?? 1);
  }
}

function ok(cmd, args, opts = {}) {
  const res = spawnSync(cmd, args, { stdio: 'ignore', ...opts });
  return res.status === 0;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function listPackageDirs(repoRoot) {
  const packagesDir = path.join(repoRoot, 'packages');
  if (!fs.existsSync(packagesDir)) return [];
  const result = [];
  function walk(dir) {
    for (const d of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!d.isDirectory()) continue;
      const full = path.join(dir, d.name);
      if (fs.existsSync(path.join(full, 'package.json'))) {
        result.push(full);
      } else {
        walk(full);
      }
    }
  }
  walk(packagesDir);
  return result;
}

function extractChangelogSection(changelogPath, version) {
  if (!fs.existsSync(changelogPath)) return null;
  const lines = fs.readFileSync(changelogPath, 'utf8').split(/\r?\n/);
  const header = `## ${version}`;

  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === header) {
      start = i;
      break;
    }
  }
  if (start === -1) return null;

  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (lines[i].startsWith('## ')) {
      end = i;
      break;
    }
  }

  const section = lines.slice(start, end).join('\n').trim();
  return section || null;
}

function sanitizeFilenamePart(s) {
  return String(s).replace(/[\\/:*?"<>|\s]/g, '_');
}

function main() {
  const repoRoot = process.cwd();
  const sha = process.env.GITHUB_SHA;
  if (!sha) die('Missing GITHUB_SHA');

  const diffRes = spawnSync(
    'git',
    ['diff-tree', '--no-commit-id', '-r', '--name-only', sha],
    { encoding: 'utf8', stdio: 'pipe' },
  );
  const changedFiles = new Set(
    (diffRes.status === 0 ? diffRes.stdout : '')
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean),
  );

  const pkgDirs = listPackageDirs(repoRoot);
  const candidates = [];

  for (const dir of pkgDirs) {
    const pkgJsonPath = path.join(dir, 'package.json');
    if (!fs.existsSync(pkgJsonPath)) continue;
    let json;
    try {
      json = readJson(pkgJsonPath);
    } catch {
      continue;
    }
    if (json?.private) continue;
    if (!json?.name || !json?.version) continue;
    candidates.push({ name: json.name, version: json.version, dir });
  }

  const published = [];
  for (const c of candidates) {
    const spec = `${c.name}@${c.version}`;
    if (ok('npm', ['view', spec, 'version', '--silent'])) {
      published.push(c);
    }
  }

  if (published.length === 0) {
    process.stdout.write(
      'No published packages detected on npm; skipping repair.\n',
    );
    return;
  }

  for (const p of published) {
    const tag = `${p.name}@${p.version}`;
    const relPath = path.relative(repoRoot, path.join(p.dir, 'package.json'));

    if (!changedFiles.has(relPath)) {
      process.stdout.write(
        `Skipping ${tag}: version not introduced by current commit (${sha}).\n`,
      );
      continue;
    }

    if (!ok('git', ['rev-parse', '-q', '--verify', `refs/tags/${tag}`])) {
      run('git', ['tag', tag, sha]);
    }
    if (!ok('git', ['push', 'origin', tag])) {
      process.stdout.write(
        `Warning: could not push tag ${tag}; it may already exist on remote.\n`,
      );
    }

    if (ok('gh', ['release', 'view', tag])) {
      continue;
    }

    const changelogPath = path.join(p.dir, 'CHANGELOG.md');
    const section = extractChangelogSection(changelogPath, p.version);

    if (section) {
      const tmp = path.join(
        repoRoot,
        `.release-notes-${sanitizeFilenamePart(tag)}.md`,
      );
      try {
        fs.writeFileSync(tmp, section + '\n');
        run('gh', [
          'release',
          'create',
          tag,
          '--target',
          sha,
          '--notes-file',
          tmp,
        ]);
      } finally {
        try {
          fs.unlinkSync(tmp);
        } catch { /* ignore cleanup errors */ }
      }
    } else {
      run('gh', [
        'release',
        'create',
        tag,
        '--target',
        sha,
        '--generate-notes',
      ]);
    }
  }
}

main();
