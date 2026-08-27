import { defineCollection, z } from "astro:content";
import skillsMapJson from "./skills_map.json" with { type: "json" };

// Shim: read generated JSON (from build.rs) but keep skills-map.ts as SSOT.
// The JSON is produced by `cargo build` via build.rs dual emit; `skills-map.ts` remains the source of truth.
const raw = skillsMapJson as unknown as {
  skills?: unknown[];
  combos?: unknown[];
};

const SKILLS_MAP: Array<{ id: string; name: string; skills: string[]; detect: unknown }> =
  (raw.skills as Array<{ id: string; name: string; skills: string[]; detect: unknown }>) ??
  (raw as unknown as Array<{ id: string; name: string; skills: string[]; detect: unknown }>);

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
