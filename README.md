<div align="center">

<a href="https://skillindex.netlify.app">
<img src="https://skillindex.netlify.app/og.png" alt="skillindex" />
</a>

# skillindex

**Un comando. Todo tu stack de skills IA. Instalado.**

[skillindex.netlify.app](https://skillindex.netlify.app)

</div>

Escanea tu proyecto, detecta tu stack tecnológico e instala automáticamente skills curadas para agentes de IA.

```bash
npx skillindex
```

## Cómo funciona

1. Ejecuta `npx skillindex` en la raíz de tu proyecto
2. Se escanean tu `package.json`, archivos Gradle y archivos de configuración para detectar tecnologías
3. Se seleccionan las mejores skills para agentes IA desde el registro auditado de skillindex
4. Solo los archivos de skills seleccionados se descargan del registro y se verifican antes de escribirse localmente

Listo. Sin configuración necesaria.

## Modelo de seguridad

`skillindex` no instala directamente desde repositorios arbitrarios en tiempo de ejecución.

Las skills son sincronizadas por los mantenedores en el registro local de skillindex, analizadas contra inyección de prompts y riesgos de supply chain, y registradas con hashes SHA-256 en un manifiesto. Cuando ejecutas `skillindex`, el CLI descarga solo las skills que tu proyecto necesita desde ese registro curado, verifica cada archivo contra el manifiesto y escribe una entrada en `skills-lock.json` con el origen instalado y el hash del bundle.

Esto mantiene el paquete liviano y evita descargas en vivo desde fuentes de skills de terceros durante la instalación.

## Opciones

```
-y, --yes       Omite la confirmación
--dry-run       Muestra lo que se instalaría sin instalar
-h, --help      Muestra la ayuda
```

## Tecnologías soportadas

Diseñado para funcionar con stacks modernos de frontend, backend, móvil, cloud y multimedia.

- **Frameworks y UI:** React, Next.js, Vue, Nuxt, Svelte, Angular, Astro, Tailwind CSS, shadcn/ui, GSAP, Three.js
- **Lenguajes y runtimes:** TypeScript, Node.js, Go, Bun, Deno, Dart
- **Backend y APIs:** Express, Hono, NestJS, Spring Boot
- **Móvil y escritorio:** Expo, React Native, Flutter, SwiftUI, Android, Kotlin Multiplatform, Tauri, Electron
- **Datos y almacenamiento:** Supabase, Neon, Prisma, Drizzle ORM, Zod, React Hook Form
- **Autenticación y pagos:** Better Auth, Clerk, Stripe
- **Testing:** Vitest, Playwright
- **Cloud e infraestructura:** Vercel, Vercel AI SDK, Cloudflare, Durable Objects, Cloudflare Agents, Cloudflare AI, AWS, Azure, Terraform
- **Herramientas:** Turborepo, Vite, oxlint
- **Medios e IA:** Remotion, ElevenLabs

## Requisitos

Node.js >= 22

## Licencia

[MIT](./LICENSE) — [GaboTech](https://github.com/Gabox301)
