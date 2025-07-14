import typescript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser
    },
    plugins: {
      '@typescript-eslint': typescript,
      prettier: prettier
    },
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'prettier/prettier': 'error'
    }
  }
];
