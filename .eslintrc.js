module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'standard-with-typescript',
    // Prettier should always come last so that it overrides other configs.
    'prettier'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json'
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-useless-constructor": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "no-lone-blocks": "off",
  }
};
