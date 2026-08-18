import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Where the built site lives on the server.
 *
 * GitHub Pages serves a project repo from https://<user>.github.io/<repo>/, so
 * the bundle has to know that prefix. Pages paths are CASE-SENSITIVE and this
 * must match the repository name exactly.
 *
 *   repo named `portfolio`      ->  '/portfolio/'
 *   repo named `DESWo.github.io` -> '/'          (a GitHub "user site")
 *   custom domain (desmondwong.com) -> '/'
 *
 * If you change this, change `site.url` in src/data/site.ts to match, so the
 * canonical URL and the sitemap keep agreeing with reality.
 */
const BASE_PATH = '/portfolio/'

export default defineConfig(({ mode }) => ({
  // Dev server always runs at the root; only the production build gets the prefix.
  base: mode === 'production' ? BASE_PATH : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    // Inline anything under 4 kB (the favicon, small SVG marks) instead of
    // spending a request on it.
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        codeSplitting: {
          groups: [
            // React and the router change far less often than portfolio
            // content does. Giving them their own chunks means editing a
            // project description does not invalidate ~180 kB of vendor code
            // in every returning visitor's cache.
            {
              name: 'vendor-react',
              test: /node_modules[/\\](react|react-dom|scheduler)[/\\]/,
              priority: 30,
            },
            {
              name: 'vendor-router',
              test: /node_modules[/\\](react-router|react-router-dom)[/\\]/,
              priority: 20,
            },
          ],
        },
      },
    },
  },
}))
