// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    'no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        caughtErrors: 'all',
        ignoreRestSiblings: false,
        reportUsedIgnorePattern: false,
      },
    ],

    'vue/html-self-closing': 'off',
  },

  languageOptions: {
    globals: {
      queryCollection: 'readonly',
    },
  },
});
// Your custom configs here
