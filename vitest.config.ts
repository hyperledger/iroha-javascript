import { defineConfig } from 'vitest/config'

// Config for global monorepo unit-testing
export default defineConfig({
  test: {
    include: ['packages/**/*.spec.ts'],
    exclude: ['packages/client/test/integration', '**/node_modules', '**/dist', '**/dist-tsc'],
    includeSource: ['packages/i64-fixnum/src/**/*.ts', 'packages/client/src/**/*.ts'],
  },
})
