module.exports = {
    extends: ['alloy', 'alloy/typescript'],
    rules: {
        'no-promise-executor-return': 'off',
    },
    overrides: [
        {
            files: ['**/*.spec.ts', '**/__tests__/*.ts', '**/packages/iroha-client/e2e/tests/**/*.ts'],
            env: {
                jest: true,
            },
            rules: {
                'max-nested-callbacks': ['error', 5],
            },
        },
    ],
};
