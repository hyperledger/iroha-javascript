import { defineConfig } from 'vitest/config'
import AllureReporter from 'allure-vitest/reporter'

export default defineConfig({
  test: {
    watch: false,
    reporters: ['basic', new AllureReporter({})],
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
    setupFiles: ['test/setup.ts'],
  },
})
