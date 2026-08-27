// @ts-check
import { defineConfig, envField, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://skillscout.sh",
  output: "static",
  prefetch: true,
  session: false,
  image: {
    responsiveStyles: true,
  },
  env: {
    schema: {
      GITHUB_TOKEN: envField.string({ context: "server", access: "secret", optional: true }),
    },
    validateSecrets: true,
  },
  security: {
    checkOrigin: true,
  },
  experimental: {
    incrementalBuild: true,
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Geist Mono",
      cssVariable: "--font-geist-mono",
      fallbacks: ["ui-monospace", "Cascadia Code", "Source Code Pro", "Menlo", "Consolas", "monospace"],
      options: {
        variants: [
          {
            weight: "100 900",
            style: "normal",
            src: ["./node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2"],
            display: "swap",
          },
        ],
      },
    },
  ],
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
