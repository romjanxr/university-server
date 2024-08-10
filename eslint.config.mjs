import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  {
    ignores: ['dist/'],
  },
  {
    files: ['src/**/*.{js,ts}'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      'prettier/prettier': ['error', { singleQuote: true }],
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  // {
  //   ignores: ['**/server.ts'],
  //   rules: {
  //     'no-console': 'warn',
  //   },
  // },
];
