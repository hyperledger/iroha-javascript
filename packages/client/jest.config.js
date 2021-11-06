/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    transform: {
        '^.+\\.(ts|js)$': [
            'esbuild-jest',
            {
                sourcemap: true,
                target: 'esnext',
            },
        ],
    },
    testEnvironment: 'node',
    testMatch: ['**/test/integration/tests/**/*.ts'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    modulePathIgnorePatterns: ['/dist/'],
};

module.exports = config;
