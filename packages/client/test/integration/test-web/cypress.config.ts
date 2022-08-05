import { defineConfig } from 'cypress'
import createBundler from '@bahmutov/cypress-esbuild-preprocessor'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor', createBundler({}))
    },
    baseUrl: 'http://127.0.0.1:3000',
    supportFile: false,
  },

  fixturesFolder: false,
  video: false,
  screenshotOnRunFailure: false,
})
