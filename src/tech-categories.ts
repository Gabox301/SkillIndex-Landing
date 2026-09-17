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
  { id: 'frontend', title: 'Frontend y UI', description: 'Frameworks, librerías y estilos para construir interfaces.' },
  { id: 'lenguajes', title: 'Lenguajes y runtimes', description: 'Los lenguajes y entornos donde corre tu código.' },
  { id: 'backend', title: 'Backend y APIs', description: 'Servidores, frameworks y trabajo en segundo plano.' },
  { id: 'movil', title: 'Móvil y escritorio', description: 'Apps nativas, multiplataforma y de escritorio.' },
  { id: 'datos', title: 'Datos y almacenamiento', description: 'Bases de datos, ORMs, validación y formularios.' },
  { id: 'auth', title: 'Autenticación y pagos', description: 'Identidad, sesiones y cobros.' },
  { id: 'testing', title: 'Testing y calidad', description: 'Tests, linters y chequeo de tipos.' },
  { id: 'cloud', title: 'Cloud e infraestructura', description: 'Deploy, edge e infraestructura como código.' },
  {
    id: 'herramientas',
    title: 'Herramientas y build',
    description: 'Bundlers, monorepos y herramientas de desarrollo.',
  },
  { id: 'medios', title: 'Medios e IA', description: 'Video, voz e inteligencia artificial.' },
  { id: 'otras', title: 'Otras tecnologías', description: 'Soporte disponible, aún sin clasificar.' },
];

/** Maps skills_map.json tech id → category id. */
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
