module.exports = {
    extends: ['alloy', 'alloy/typescript'],
    rules: {
        'no-promise-executor-return': 'off',
        'spaced-comment': ['error', 'always', { markers: ['/'] }],
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
            files: [
                '**/packages/crypto/test/web/cypress/**/*.js',
                '**/packages/client/test/integration/test-web/cypress/integration/**/*.js',
            ],
            plugins: ['cypress'],
            env: {
                'cypress/globals': true,
            },
        },
    ],
};
