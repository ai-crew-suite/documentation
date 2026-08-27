import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/unit/setup.ts'],
  },
  resolve: {
    alias: [
      { find: /^@\/(.*)/, replacement: path.resolve(__dirname, './$1') },
    ],
  },
})