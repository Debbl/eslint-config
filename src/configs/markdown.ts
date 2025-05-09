import { GLOB_MARKDOWN, GLOB_MARKDOWN_CODE } from '../globs'
import { interopDefault, parserPlain } from '../utils'
import type { ConfigFn, ConfigItem, OptionsOverrides } from '../types'

export type MarkdownConfig = (
  options: {
    componentExts?: string[]
    /**
     * @deprecated remove this option
     */
    mdx?: boolean
  } & OptionsOverrides,
) => ReturnType<ConfigFn>

export const markdown: MarkdownConfig = async (options) => {
  const { mdx: _enableMdx = false, componentExts = [], overrides = {} } = options

  const pluginMarkdown = await interopDefault(import('@eslint/markdown'))

  const _markdown: ConfigItem[] = [
    {
      name: 'eslint/markdown/setup',
      plugins: {
        markdown: pluginMarkdown,
      },
    },
    {
      name: 'eslint/markdown/processor',
      files: [GLOB_MARKDOWN],
      languageOptions: {
        ecmaVersion: 'latest',
        parser: parserPlain,
        sourceType: 'module',
      },
    },
    {
      name: 'eslint/markdown/disables',
      files: [GLOB_MARKDOWN_CODE, ...componentExts.map((ext) => `${GLOB_MARKDOWN}/**/*.${ext}`)],
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            impliedStrict: true,
          },
        },
      },
      rules: {
        'no-alert': 'off',
        'no-console': 'off',
        'no-undef': 'off',
        'no-unused-expressions': 'off',
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

  return _markdown
}
