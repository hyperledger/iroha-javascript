// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

const resolvePkgSrc = (unscopedName, ...paths) => path.resolve(__dirname, '../../../../', unscopedName, ...paths);

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    transform: {
        '^.+\\.(ts|js)$': 'esbuild-runner/jest',
    },
    transformIgnorePatterns: [],
    testEnvironment: 'node',
    testMatch: ['**/*.spec.ts'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    modulePathIgnorePatterns: ['/dist/'],
    moduleNameMapper: {
        '@iroha2/client-isomorphic-fetch': resolvePkgSrc('client-isomorphic-fetch', 'dist/node.js'),
        '@iroha2/client-isomorphic-ws': resolvePkgSrc('client-isomorphic-ws', 'dist/ws.js'),
    },
};

module.exports = config;
