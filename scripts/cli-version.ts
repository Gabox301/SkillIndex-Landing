#!/usr/bin/env bun
/**
 * cli-version — resolves the CLI version shown on the landing at build time.
 * Source of truth: npm registry (skillindex@latest).
 * Always writes src/generated/cli-version.json; falls back to the local
 * package.json version when the registry is unreachable (offline builds).
 */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const REGISTRY_URL = 'https://registry.npmjs.org/skillindex/latest';
const TIMEOUT_MS = 8000;
const SEMVER_RE = /^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?(\+[0-9A-Za-z.-]+)?$/;
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outFile = join(root, 'src', 'generated', 'cli-version.json');

function readLocalVersion(): string {
  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf-8')) as { version?: unknown };
  return typeof pkg.version === 'string' ? pkg.version : '0.0.0';
}

async function fetchRegistryVersion(): Promise<string> {
  const res = await fetch(REGISTRY_URL, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!res.ok) throw new Error(`registry responded ${res.status}`);
  const data = (await res.json()) as { version?: unknown };
  if (typeof data.version !== 'string' || !SEMVER_RE.test(data.version)) {
    throw new Error('registry returned invalid version');
  }
  return data.version;
}

function write(version: string, source: 'npm' | 'fallback'): void {
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, `${JSON.stringify({ version, source, updatedAt: new Date().toISOString() }, null, 2)}\n`);
}

const fallback = readLocalVersion();
try {
  const version = await fetchRegistryVersion();
  write(version, 'npm');
  console.log(`✔ cli-version: ${version} (npm)`);
} catch (err) {
  write(fallback, 'fallback');
  console.warn(
    `⚠ cli-version: registry unreachable (${err instanceof Error ? err.message : err}) — using package.json ${fallback}`,
  );
}
