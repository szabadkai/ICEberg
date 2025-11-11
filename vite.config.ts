import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => ({
  base: mode === 'standalone' ? '/ICEberg/' : '/',
  build: {
    target: 'esnext',
  },
}))
