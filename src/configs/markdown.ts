import { mergeProcessors, processorPassThrough } from 'eslint-merge-processors'
import {
  GLOB_MARKDOWN,
  GLOB_MARKDOWN_CODE,
  GLOB_MARKDOWN_IN_MARKDOWN,
} from '../globs'
import { interopDefault } from '../utils'
import type {
  ConfigItem,
  OptionsComponentExts,
  OptionsFiles,
  OptionsMarkdown,
} from '../types'

export type MarkdownConfig = (
  options: OptionsFiles & OptionsComponentExts & OptionsMarkdown,
) => Promise<ConfigItem[]>

export const markdown: MarkdownConfig = async (
  options: OptionsFiles & OptionsComponentExts & OptionsMarkdown = {},
) => {
  const {
    componentExts = [],
    files = [GLOB_MARKDOWN],
    gfm = true,
    overrides = {},
    overridesMarkdown = {},
  } = options

  const pluginMarkdown = await interopDefault(import('@eslint/markdown'))

  return [
    {
      name: 'eslint/markdown/setup',
      plugins: {
        markdown: pluginMarkdown,
      },
    },
    {
      files,
      ignores: [GLOB_MARKDOWN_IN_MARKDOWN],
      name: 'eslint/markdown/processor',
      processor: mergeProcessors([
        pluginMarkdown.processors!.markdown,
        processorPassThrough,
      ]),
    },
    {
      files,
      language: gfm ? 'markdown/gfm' : 'markdown/commonmark',
      name: 'eslint/markdown/parser',
    },
    {
      files,
      name: 'eslint/markdown/rules',
      rules: {
        ...pluginMarkdown.configs.recommended.at(0)?.rules,
        'markdown/no-missing-label-refs': 'off',
        ...overridesMarkdown,
      },
    },
    {
      files,
      name: 'eslint/markdown/disables/markdown',
      rules: {
        'jsdoc/check-access': 'off',
        'jsdoc/check-alignment': 'off',
        'jsdoc/check-param-names': 'off',
        'jsdoc/check-property-names': 'off',
        'jsdoc/check-types': 'off',
        'jsdoc/empty-tags': 'off',
        'jsdoc/implements-on-classes': 'off',
        'jsdoc/multiline-blocks': 'off',
        'jsdoc/no-defaults': 'off',
        'jsdoc/no-multi-asterisks': 'off',
        'jsdoc/require-param-name': 'off',
        'jsdoc/require-property': 'off',
        'jsdoc/require-property-description': 'off',
        'jsdoc/require-property-name': 'off',
        'jsdoc/require-returns-check': 'off',
        'jsdoc/require-returns-description': 'off',
        'jsdoc/require-yields-check': 'off',
        'no-irregular-whitespace': 'off',
        'perfectionist/sort-exports': 'off',
        'perfectionist/sort-imports': 'off',
      },
    },
    {
      files: [
        GLOB_MARKDOWN_CODE,
        ...componentExts.map((ext) => `${GLOB_MARKDOWN}/**/*.${ext}`),
      ],
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            impliedStrict: true,
          },
        },
      },
      name: 'eslint/markdown/disables/code',
      rules: {
        'no-alert': 'off',
        'no-console': 'off',
        'no-labels': 'off',
        'no-lone-blocks': 'off',
        'no-restricted-syntax': 'off',
        'no-undef': 'off',
        'no-unused-expressions': 'off',
        'no-unused-labels': 'off',
        'no-unused-vars': 'off',

        'node/prefer-global/process': 'off',

        '@typescript-eslint/consistent-type-imports': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-redeclare': 'off',
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'off',

        'unicode-bom': 'off',
        'unused-imports/no-unused-imports': 'off',
        'unused-imports/no-unused-vars': 'off',

        '@typescript-eslint/await-thenable': 'off',
        '@typescript-eslint/dot-notation': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-for-in-array': 'off',
        '@typescript-eslint/no-implied-eval': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-throw-literal': 'off',
        '@typescript-eslint/no-unnecessary-type-assertion': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/restrict-plus-operands': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/unbound-method': 'off',

        ...overrides,
      },
    },
  ]
}
