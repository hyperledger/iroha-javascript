/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
        '**/packages/**/*.spec.ts',
        '**/packages/**/__tests__/**/*.ts',
        '**/packages/iroha-client/e2e/tests/**/*.ts',
    ],
    roots: ['<rootDir>/packages'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/', '/iroha-crypto/ursa-wasm/'],
    modulePathIgnorePatterns: ['/dist/'],
    moduleNameMapper: {
        '^@iroha/crypto/esm': '<rootDir>/packages/iroha-crypto/esm.js',
        '^@iroha/crypto/cjs': '<rootDir>/packages/iroha-crypto/cjs.js',
        '^@iroha/data-model': '<rootDir>/packages/iroha-data-model/src/lib.ts',
        '^@iroha/client': '<rootDir>/packages/iroha-client/src/lib.ts',
    },
};

module.exports = config;
