/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  transform: {
    '^.+\\.(ts|js)$': 'esbuild-runner/jest',
  },
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts', '**/__tests__/**/*.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  modulePathIgnorePatterns: ['/dist/'],
}

module.exports = config
