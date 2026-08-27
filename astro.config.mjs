import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  prefetch: true,
  session: false,
  image: {
    responsiveStyles: true,
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
      name: 'Geist Mono',
      cssVariable: '--font-geist-mono',
      fallbacks: ['ui-monospace', 'Cascadia Code', 'Source Code Pro', 'Menlo', 'Consolas', 'monospace'],
      options: {
        variants: [
          {
            weight: '100 900',
            style: 'normal',
            src: ['./node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2'],
            display: 'swap',
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
