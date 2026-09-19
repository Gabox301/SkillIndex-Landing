/**
 * tech-categories — taxonomy for section 03 of the landing.
 * Mirrors the grouping used by the CLI docs (see README "Tecnologías soportadas").
 *
 * NOTE: src/skills_map.json carries no category field (it is generated from
 * the CLI repo), so the mapping lives here. Techs missing from TECH_CATEGORY
 * fall into "otras" automatically and log a build-time warning — extend the
 * map when the CLI adds new technologies.
 */

export interface TechCategory {
  id: string;
  title: string;
  description: string;
}

export const CATEGORIES: TechCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend y UI',
    description: 'Mejores prácticas de React, Next y Vue, Tailwind, GSAP, Three.js. y más...',
  },
  {
    id: 'lenguajes',
    title: 'Lenguajes y runtimes',
    description: 'Tipos avanzados, patrones y testing en TypeScript, Go, Rust, Python, entre otros.',
  },
  {
    id: 'backend',
    title: 'Backend y APIs',
    description: 'NestJS, Rails, Laravel, Django, FastAPI y .NET con sus convenciones.',
  },
  {
    id: 'movil',
    title: 'Móvil y escritorio',
    description: 'Expo, Flutter, SwiftUI, Android nativo y Tauri, de punta a punta.',
  },
  {
    id: 'datos',
    title: 'Datos y almacenamiento',
    description: 'Postgres, Prisma, Drizzle, Redis y validación con Zod.',
  },
  {
    id: 'auth',
    title: 'Autenticación y pagos',
    description: 'Clerk, Better Auth y Stripe, para integraciones seguras.',
  },
  { id: 'testing', title: 'Testing y calidad', description: 'Playwright, Vitest, RSpec y TDD en tu stack.' },
  {
    id: 'cloud',
    title: 'Cloud e infraestructura',
    description: 'Deploy en Vercel, Workers, Durable Objects y Terraform.',
  },
  {
    id: 'herramientas',
    title: 'Herramientas y build',
    description: 'Turborepo, Vite y oxlint afinados, para optimizar tu flujo de trabajo.',
  },
  { id: 'medios', title: 'Medios e IA', description: 'Video con Remotion y voz y música con ElevenLabs.' },
  { id: 'otras', title: 'Otras tecnologías', description: 'Soporte disponible, aún sin clasificar.' },
];

/** Section [04]: `--domain` installs the FULL skill set of a curated domain
 *  without detection (repeatable, combined with detected).
 *  Source of truth: SkillIndex repo src/skills/domains/*.rs + each skill's
 *  SKILL.md. Counts verified 2026-09-19; bump them if the CLI adds skills. */
export interface DomainEntry {
  id: string;
  name: string;
  count: number;
  description: string;
}

export const DOMAINS: DomainEntry[] = [
  {
    id: 'gentleman-programming',
    name: 'Gentleman Programming',
    count: 24,
    description: 'PRs, reviews, documentación y SDD con disciplina.',
  },
  {
    id: 'mattpocock-skills',
    name: 'Matt Pocock Skills',
    count: 37,
    description: 'Mentoría TypeScript: enseñanza, review, TDD y arquitectura.',
  },
  {
    id: 'anydoc',
    name: 'AnyDoc Document Conversion',
    count: 1,
    description: 'Convierte Word, Excel, PowerPoint y PDF a Markdown.',
  },
  {
    id: 'archify',
    name: 'Archify',
    count: 1,
    description: 'Diagramas de arquitectura y flujos como HTML explorable.',
  },
  {
    id: 'book-to-skill',
    name: 'Book to Skill',
    count: 1,
    description: 'Convierte libros y documentos en skills reutilizables.',
  },
  { id: 'copywriting', name: 'Copywriting', count: 1, description: 'Copy de marketing que persuade y convierte.' },
  {
    id: 'design-dna',
    name: 'Design DNA',
    count: 1,
    description: 'Extrae y aplica el ADN de diseño de cualquier referencia.',
  },
  { id: 'find-skills', name: 'Find Skills', count: 1, description: 'Descubre qué skills puedes instalar.' },
  {
    id: 'graphify',
    name: 'Graphify',
    count: 1,
    description: 'Convierte código, docs y papers en grafos de conocimiento.',
  },
  {
    id: 'taste-skill',
    name: 'Taste Skill',
    count: 1,
    description: 'Interfaces que no parecen plantillas: criterio real.',
  },
];

export const TECH_CATEGORY: Record<string, string> = {
  // Frontend y UI
  react: 'frontend',
  nextjs: 'frontend',
  vue: 'frontend',
  nuxt: 'frontend',
  pinia: 'frontend',
  svelte: 'frontend',
  angular: 'frontend',
  astro: 'frontend',
  'tanstack-start': 'frontend',
  'react-router': 'frontend',
  tailwind: 'frontend',
  shadcn: 'frontend',
  gsap: 'frontend',
  threejs: 'frontend',
  '@react-three/fiber': 'frontend',
  'chrome-extension': 'frontend',
  wordpress: 'frontend',
  // Lenguajes y runtimes
  typescript: 'lenguajes',
  node: 'lenguajes',
  bun: 'lenguajes',
  deno: 'lenguajes',
  go: 'lenguajes',
  rust: 'lenguajes',
  python: 'lenguajes',
  ruby: 'lenguajes',
  java: 'lenguajes',
  csharp: 'lenguajes',
  php: 'lenguajes',
  dart: 'lenguajes',
  bash: 'lenguajes',
  // Backend y APIs
  express: 'backend',
  elysia: 'backend',
  hono: 'backend',
  nestjs: 'backend',
  fastapi: 'backend',
  django: 'backend',
  flask: 'backend',
  laravel: 'backend',
  springboot: 'backend',
  dotnet: 'backend',
  aspnetcore: 'backend',
  'aspnet-blazor': 'backend',
  'aspnet-minimal-api': 'backend',
  rails: 'backend',
  fastmcp: 'backend',
  celery: 'backend',
  sidekiq: 'backend',
  pydantic: 'backend',
  activeadmin: 'backend',
  // Móvil y escritorio
  expo: 'movil',
  'react-native': 'movil',
  flutter: 'movil',
  swiftui: 'movil',
  android: 'movil',
  'kotlin-multiplatform': 'movil',
  tauri: 'movil',
  electron: 'movil',
  // Datos y almacenamiento
  supabase: 'datos',
  neon: 'datos',
  instantdb: 'datos',
  prisma: 'datos',
  drizzle: 'datos',
  sqlalchemy: 'datos',
  'postgres-ruby': 'datos',
  'redis-ruby': 'datos',
  zod: 'datos',
  'react-hook-form': 'datos',
  pandas: 'datos',
  numpy: 'datos',
  'scikit-learn': 'datos',
  requests: 'datos',
  // Autenticación y pagos
  clerk: 'auth',
  'better-auth': 'auth',
  devise: 'auth',
  stripe: 'auth',
  // Testing y calidad
  playwright: 'testing',
  vitest: 'testing',
  pytest: 'testing',
  rspec: 'testing',
  rubocop: 'testing',
  sorbet: 'testing',
  // Cloud e infraestructura
  'vercel-deploy': 'cloud',
  'vercel-ai': 'cloud',
  cloudflare: 'cloud',
  'cloudflare-durable-objects': 'cloud',
  'cloudflare-agents': 'cloud',
  'cloudflare-ai': 'cloud',
  aws: 'cloud',
  azure: 'cloud',
  terraform: 'cloud',
  // Herramientas y build
  turborepo: 'herramientas',
  vite: 'herramientas',
  oxlint: 'herramientas',
  // Medios e IA
  remotion: 'medios',
  elevenlabs: 'medios',
};
