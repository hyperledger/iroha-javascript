module.exports = {
    extends: ['alloy', 'alloy/typescript'],
    rules: {
        'no-promise-executor-return': 'off',
    },
    overrides: [
        {
            files: [
                '**/*.spec.ts',
                '**/__tests__/*.ts',
                '**/packages/iroha-client/e2e/tests/**/*.ts',
                '**/packages/iroha-crypto/test/node/**/*.ts',
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
