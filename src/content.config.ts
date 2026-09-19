import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';
import skillsMapJson from './skills_map.json' with { type: 'json' };

// Shim: read generated JSON (from build.rs) but keep skills-map.ts as SSOT.
// The JSON is produced by `cargo build` via build.rs dual emit; `skills-map.ts` remains the source of truth.
interface RawTech {
  id: string;
  name: string;
  skills: string[];
  detect: unknown;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function mergeDetect(a: unknown, b: unknown): unknown {
  if (Array.isArray(a) && Array.isArray(b)) {
    const seen = new Set(a.map((v) => JSON.stringify(v)));
    return [...a, ...b.filter((v) => !seen.has(JSON.stringify(v)))];
  }
  if (isRecord(a) && isRecord(b)) {
    const out: Record<string, unknown> = { ...a };
    for (const [k, v] of Object.entries(b)) out[k] = k in out ? mergeDetect(out[k], v) : v;
    return out;
  }
  return b ?? a;
}

// The dual emit produces one entry per phase (detect-only with empty skills,
// then skills with detect). Merge by id so the landing never depends on entry
// order: union of skills, deep merge of detect rules.
function mergeById(entries: RawTech[]): RawTech[] {
  const byId = new Map<string, RawTech>();
  for (const tech of entries) {
    const prev = byId.get(tech.id);
    const skills = tech.skills ?? [];
    if (!prev) {
      byId.set(tech.id, { ...tech, skills: [...skills] });
      continue;
    }
    byId.set(tech.id, {
      ...prev,
      name: tech.name || prev.name,
      skills: [...prev.skills, ...skills.filter((s) => !prev.skills.includes(s))],
      detect: mergeDetect(prev.detect, tech.detect),
    });
  }
  return [...byId.values()];
}

const raw = skillsMapJson as unknown as {
  skills?: unknown[];
  combos?: unknown[];
};

const SKILLS_MAP: RawTech[] = mergeById(
  ((raw.skills as RawTech[] | undefined) ?? (raw as unknown as RawTech[])) as RawTech[],
);

const skills = defineCollection({
  loader: async () => {
    return SKILLS_MAP.map((tech) => ({
      id: tech.id,
      name: tech.name,
      skills: tech.skills,
      detect: tech.detect,
    }));
  },
  schema: z.object({
    name: z.string(),
    skills: z.array(z.string()),
    detect: z.any(),
  }),
});

export const collections = { skills };
