import js from '@eslint/js';
import markdown from '@eslint/markdown';
import vitest from '@vitest/eslint-plugin';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import nodePlugin from 'eslint-plugin-n';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import * as regexpPlugin from 'eslint-plugin-regexp';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import * as tseslint from 'typescript-eslint';

export default defineConfig([
  // Global Ignores
  {
    ignores: [
      // Dependencies
      '**/node_modules/**',
      '.pnpm-store/**',
      'pnpm-lock.yaml',

      // Outputs
      '**/dist/**',
      '**/lib/**',
      '**/coverage/**',
      '**/.rslib/**',
      '**/.turbo/**',
      '**/test/js',
      '.changeset/*',
      '**/CHANGELOG.md',
      '**/etc/*.md',
      'output/**',
      'target/**',

      // Test snapshots
      '**/expected/**',
      '**/rspack-expected/**',

      // Configs
      'eslint.config.js',
      'vitest.config.ts',
      '**/rslib.config.ts',

      // Ignored packages
      'packages/**/vitest.config.ts',

      // Non-code text
      '**/*.{css,scss,sass,less,md,mdx,json,yaml,yml,svg,html}',
    ],
  },

  // Javascript
  js.configs.recommended,

  // RegExp
  regexpPlugin.configs['flat/recommended'],

  // Node
  {
    plugins: { n: nodePlugin },
    rules: {
      'n/prefer-node-protocol': 'error',
      'n/file-extension-in-import': 'off', // delegate to bundler/tsc

      'n/no-extraneous-import': 'error',

      'n/no-missing-import': 'off',
      'n/no-unpublished-import': 'off',
      'n/hashbang': 'off',
    },
  },

  // Unicorn
  {
    plugins: { unicorn },
    rules: {
      'unicorn/consistent-function-scoping': 'error',
      'unicorn/no-invalid-remove-event-listener': 'error',
      'unicorn/no-array-push-push': 'error',

      'unicorn/no-abusive-eslint-disable': 'error',
      'unicorn/no-anonymous-default-export': 'error',
      'unicorn/no-await-expression-member': 'error',
      'unicorn/no-await-in-promise-methods': 'error',
      'unicorn/no-hex-escape': 'error',
      'unicorn/no-nested-ternary': 'error',
      'no-nested-ternary': 'off',
      'unicorn/no-new-array': 'error',
      'unicorn/empty-brace-spaces': 'error',
      'unicorn/no-lonely-if': 'error',

      // Additional
      'unicorn/expiring-todo-comments': 'warn',
      'unicorn/no-array-callback-reference': 'warn',
      'unicorn/no-console-spaces': 'warn',
      'unicorn/no-negated-condition': 'off',
    },
  },

  // Import
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
      'import/internal-regex': '^(@/|@dugyu/)',
    },
    rules: {
      'import/no-commonjs': 'error',
      'import/no-cycle': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/order': [
        'error',
        {
          'groups': [
            'builtin', // Built-in imports (come from NodeJS native) go first
            'external', // <- External imports
            'internal', // <- Absolute imports
            ['sibling', 'parent'], // <- Relative imports, the sibling and parent types they can be mingled together
            'index',
            'unknown',
          ],
          'newlines-between': 'always',
          'alphabetize': {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/consistent-type-specifier-style': 'warn',
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true, // use eslint-plugin-import instead
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: true,
        },
      ],
    },
  },

  // Global Environment
  {
    languageOptions: {
      globals: {
        ...globals.nodeBuiltin,
        ...globals.es2021,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },

  // TS
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['**/*.md/**'],
    extends: [
      tseslint.configs.eslintRecommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        projectService: {
          allowDefaultProject: ['./*.js', '*.config.ts'],
          defaultProject: './tsconfig.json',
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/consistent-generic-constructors': 'off',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/prefer-as-const': 'warn',
      '@typescript-eslint/prefer-function-type': 'warn',
      '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/prefer-reduce-type-parameter': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
  },

  {
    files: ['**/*.d.ts', '**/types/**/*.ts'],
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
    },
  },

  // JS
  {
    files: ['**/*.{js,jsx,cjs,mjs}'],
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      // turn off other type-aware rules
      'deprecation/deprecation': 'off',
      '@typescript-eslint/internal/no-poorly-typed-ts-props': 'off',
      // turn off rules that don't apply to JS code
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        jsxPragma: null,
      },
    },
  },

  // React
  {
    files: [
      '**/*.{jsx,tsx,ts}',
    ],
    extends: [
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
  },

  // Frontend
  {
    files: [
      'apps/**/*.{js,mjs,cjs,jsx,ts,tsx}',
    ],
    languageOptions: {
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        jsxPragma: null,
      },
    },
  },

  // Vitest
  {
    files: ['**/*.test.ts', '**/*.test-d.ts'],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
    settings: {
      vitest: {
        typecheck: true,
      },
    },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
  },

  // Markdown
  {
    files: ['**/*.md'],
    plugins: { markdown },
    language: 'markdown/gfm',
    extends: [
      ...markdown.configs.recommended,
      ...markdown.configs.processor,
    ],
  },
]);
