module.exports = {
    extends: ['alloy', 'alloy/typescript'],
    overrides: [
        {
            files: ['**/*.spec.ts', '**/__tests__/*.ts'],
            env: {
                jest: true,
            },
        },
    ],
};
