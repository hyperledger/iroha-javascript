module.exports = {
    extends: ['alloy', 'alloy/typescript'],
    rules: {
        'no-promise-executor-return': 'off',
    },
    globals: {
        BigInt: true,
    },
    overrides: [
        {
            files: [
                '**/*.spec.ts',
                '**/__tests__/*.ts',
                '**/packages/client/e2e/tests/**/*.ts',
                '**/packages/crypto/test/node/**/*.ts',
            ],
            env: {
                jest: true,
            },
            rules: {
                'max-nested-callbacks': ['error', 5],
            },
        },
        {
            files: ['**/packages/iroha-crypto/test/web/cypress/**/*.js'],
            plugins: ['cypress'],
            env: {
                'cypress/globals': true,
            },
        },
    ],
};
