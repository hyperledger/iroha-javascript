/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    transform: {
        '^.+\\.(ts|js)$': [
            'esbuild-jest',
            {
                sourcemap: true,
            },
        ],
    },
    testEnvironment: 'node',
    testMatch: ['**/test/integration/tests/**/*.ts'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    modulePathIgnorePatterns: ['/dist/'],
    moduleNameMapper: {
        '^@iroha/data-model': '<rootDir>/../iroha-data-model/src/lib.ts',
    },
};

module.exports = config;
