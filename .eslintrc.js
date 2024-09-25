/* eslint-env node */
module.exports = {
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/typescript',
    'eslint:recommended',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  env: {
    node: true
  },
  rules: {
    "no-unused-vars": "off",
    'vue/multi-word-component-names': 'off'
  },
};