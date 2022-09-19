import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['*.spec.ts'],
    watch: false,
    reporters: 'tap-flat',
    threads: false,
  },
})
