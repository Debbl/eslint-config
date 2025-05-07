import process from 'node:process'
import { GLOB_ASTRO_TS, GLOB_MARKDOWN, GLOB_SRC, GLOB_TS, GLOB_TSX } from '../globs'
import { interopDefault } from '../utils'
import type {
  ConfigFn,
  ConfigItem,
  OptionsComponentExts,
  OptionsOverrides,
  OptionsTypeScriptParserOptions,
  OptionsTypeScriptWithTypes,
} from '../types'

export type TypeScriptConfig = (
  options?: OptionsComponentExts &
    OptionsTypeScriptWithTypes &
    OptionsTypeScriptParserOptions &
    OptionsOverrides & {
      enableSolid?: boolean
    },
) => ReturnType<ConfigFn>

const typeAwareRules: ConfigItem['rules'] = {
  'dot-notation': 'off',
  'no-implied-eval': 'off',
  '@typescript-eslint/await-thenable': 'error',
  '@typescript-eslint/dot-notation': ['error', { allowKeywords: true }],
  '@typescript-eslint/no-floating-promises': 'error',
  '@typescript-eslint/no-for-in-array': 'error',
  '@typescript-eslint/no-implied-eval': 'error',
  '@typescript-eslint/no-misused-promises': 'error',
  '@typescript-eslint/no-unnecessary-type-assertion': 'error',
  '@typescript-eslint/no-unsafe-argument': 'error',
  '@typescript-eslint/no-unsafe-assignment': 'error',
  '@typescript-eslint/no-unsafe-call': 'error',
  '@typescript-eslint/no-unsafe-member-access': 'error',
  '@typescript-eslint/no-unsafe-return': 'error',
  '@typescript-eslint/promise-function-async': 'error',
  '@typescript-eslint/restrict-plus-operands': 'error',
  '@typescript-eslint/restrict-template-expressions': 'error',
  '@typescript-eslint/return-await': ['error', 'in-try-catch'],
  '@typescript-eslint/strict-boolean-expressions': ['error', { allowNullableBoolean: true, allowNullableObject: true }],
  '@typescript-eslint/switch-exhaustiveness-check': 'error',
  '@typescript-eslint/unbound-method': 'error',
}

export const typescript: TypeScriptConfig = async (options) => {
  const { overrides = {}, componentExts = [], parserOptions = {}, tsconfigPath, enableSolid = false } = options ?? {}

  const isTypeAware = !!tsconfigPath

  const [pluginTs, parserTs] = await Promise.all([
    interopDefault(import('@typescript-eslint/eslint-plugin')),
    interopDefault(import('@typescript-eslint/parser')),
  ] as const)

  return [
    {
      // Install the plugins without globs, so they can be configured separately.
      name: 'eslint/typescript/setup',
      plugins: {
        '@typescript-eslint': pluginTs,
        ...(enableSolid
          ? {
              solid: await interopDefault(import('eslint-plugin-solid')),
            }
          : {}),
      },
    },
    {
      name: 'eslint/typescript/rules',
      files: [GLOB_SRC, ...componentExts.map((ext) => `**/*.${ext}`)],
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          extraFileExtensions: componentExts.map((ext) => `.${ext}`),
          sourceType: 'module',

          ...(tsconfigPath
            ? {
                project: [tsconfigPath],
                tsconfigRootDir: process.cwd(),
              }
            : {}),
          ...(parserOptions as any),
        },
      },
      rules: {
        ...pluginTs.configs['eslint-recommended'].overrides![0].rules!,
        ...pluginTs.configs.strict.rules!,

        ...(enableSolid
          ? {
              'solid/jsx-no-undef': ['error', { typescriptEnabled: true }],
              'solid/no-unknown-namespaces': 'off',
            }
          : {}),
        'no-dupe-class-members': 'off',
        'no-redeclare': 'off',
        'no-use-before-define': 'off',
        'no-useless-constructor': 'off',
        '@typescript-eslint/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            disallowTypeAnnotations: false,
            fixStyle: 'separate-type-imports',
            prefer: 'type-imports',
          },
        ],

        // https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
        '@typescript-eslint/method-signature-style': ['error', 'property'],
        '@typescript-eslint/no-dupe-class-members': 'error',
        '@typescript-eslint/no-dynamic-delete': 'off',
        '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'always' }],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-extraneous-class': 'off',
        '@typescript-eslint/no-import-type-side-effects': 'error',
        '@typescript-eslint/no-invalid-void-type': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-redeclare': ['error', { builtinGlobals: false }],
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/no-unused-expressions': [
          'error',
          {
            allowShortCircuit: true,
            allowTaggedTemplates: true,
            allowTernary: true,
          },
        ],
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
        '@typescript-eslint/no-useless-constructor': 'off',
        '@typescript-eslint/no-wrapper-object-types': 'error',
        '@typescript-eslint/triple-slash-reference': 'off',
        '@typescript-eslint/unified-signatures': 'off',

        ...overrides,
      },
    },
    ...((isTypeAware
      ? [
          {
            name: 'eslint/typescript/rules-type-aware',
            files: [GLOB_TS, GLOB_TSX],
            ignores: [`${GLOB_MARKDOWN}/**`, `${GLOB_ASTRO_TS}/**`],
            rules: {
              ...typeAwareRules,
            },
          },
        ]
      : []) satisfies ConfigItem[]),
    {
      name: 'eslint/typescript/dts-overrides',
      files: ['**/*.d.ts'],
      rules: {
        'eslint-comments/no-unlimited-disable': 'off',
        'import/no-duplicates': 'off',
        'no-restricted-syntax': 'off',
        'unused-imports/no-unused-vars': 'off',
      },
    },
    {
      name: 'eslint/typescript/disables/test',
      files: ['**/*.{test,spec}.ts?(x)'],
      rules: {
        'no-unused-expressions': 'off',
      },
    },
    {
      name: 'eslint/typescript/disables/cjs',
      files: ['**/*.js', '**/*.cjs'],
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ]
}
