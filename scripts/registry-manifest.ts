#!/usr/bin/env bun
/**
 * registry-manifest — resolves the honest skill count at build time.
 * Source of truth: the CLI curated registry manifest
 * (SkillIndex/skills-registry/index.json), NOT the local tech list.
 * Always prefers fresh data; on registry failure keeps the last generated
 * file (committed seed) so offline builds still work.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const MANIFEST_URL = 'https://raw.githubusercontent.com/Gabox301/SkillIndex/HEAD/skills-registry/index.json';
const TIMEOUT_MS = 15000;
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outFile = join(root, 'src', 'generated', 'registry.json');

interface Manifest {
  generatedAt?: unknown;
  version?: unknown;
  skills?: unknown;
}

function write(
  totalSkills: number,
  generatedAt: string,
  manifestVersion: number,
  source: 'registry' | 'fallback',
): void {
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(
    outFile,
    `${JSON.stringify({ totalSkills, generatedAt, manifestVersion, source, updatedAt: new Date().toISOString() }, null, 2)}\n`,
  );
}

try {
  const res = await fetch(MANIFEST_URL, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!res.ok) throw new Error(`registry responded ${res.status}`);
  const manifest = (await res.json()) as Manifest;
  const skills = isRecord(manifest.skills) ? manifest.skills : {};
  const totalSkills = Object.keys(skills).length;
  if (totalSkills === 0) throw new Error('registry returned zero skills');
  const generatedAt = typeof manifest.generatedAt === 'string' ? manifest.generatedAt : new Date().toISOString();
  const manifestVersion = typeof manifest.version === 'number' ? manifest.version : 0;
  write(totalSkills, generatedAt, manifestVersion, 'registry');
  console.log(`✔ registry-manifest: ${totalSkills} skills (registry)`);
} catch (err) {
  if (existsSync(outFile)) {
    const prev = JSON.parse(readFileSync(outFile, 'utf-8')) as { totalSkills?: unknown };
    console.warn(
      `⚠ registry-manifest: unreachable (${err instanceof Error ? err.message : err}) — keeping previous ${String(prev.totalSkills)}`,
    );
  } else {
    write(0, new Date(0).toISOString(), 0, 'fallback');
    console.warn(
      `⚠ registry-manifest: unreachable (${err instanceof Error ? err.message : err}) — wrote empty fallback`,
    );
  }
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}
