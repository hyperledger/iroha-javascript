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
        '**/packages/client/test/integration/test-web/cypress/integration/**/*.{js,ts}',
        '**/packages/client/test/integration/test-web/cypress/support/**/*.{js,ts}',
      ],
      plugins: ['cypress'],
      env: {
        'cypress/globals': true,
      },
    },
    // ESLint Vue from web tests
    {
      files: ['**/packages/client/test/integration/test-web/src/**/*.vue'],
      extends: ['plugin:vue/vue3-recommended'],
      parserOptions: {
        ecmaVersion: 2020,
        parser: '@typescript-eslint/parser',
      },
      rules: {
        'vue/html-indent': ['warn', 2],
      },
    },
  ],
}
