/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  testEnvironment: 'node',
  transform: {
    '.+\\.(ts|js)$': 'esbuild-jest',
  },
  testMatch: ['**/simple.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
}

module.exports = config
