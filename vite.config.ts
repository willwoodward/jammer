import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Icons are already picked up by the png glob below — listing them in
      // includeAssets as well would precache each one twice.
      manifest: {
        name: 'jammer',
        short_name: 'jammer',
        description: 'Shared lyrics for spontaneous worship sessions.',
        theme_color: '#111111',
        background_color: '#111111',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico,webmanifest}'],
        // The ProPresenter parser is a quarter of a megabyte and is only needed
        // when someone imports one, so it stays a lazy download rather than
        // something every install pays for up front.
        // The plugin precaches the manifest and its icons itself, so matching
        // them here as well would list each one twice.
        globIgnores: ['**/propresenter-*.js', '**/manifest.webmanifest', '**/icon-*.png'],
        navigateFallback: 'index.html',
      },
    }),
  ],
  // For GitHub Pages: set to '/<repo-name>/'
  // For custom domain or Netlify: set to '/'
  base: process.env.GITHUB_PAGES ? '/jammer/' : '/',
})
