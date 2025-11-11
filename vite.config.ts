import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => ({
  base: mode === 'standalone' ? '/ICEberg/' : '/',
  build: {
    target: 'esnext',
    outDir: mode === 'standalone' ? 'docs' : 'dist',
  },
}))
