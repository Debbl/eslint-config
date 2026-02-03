import { GLOB_YAML } from '../globs'
import { interopDefault } from '../utils'
import type { ConfigFn, OptionsOverrides } from '../types'

export type YmlConfig = (options: OptionsOverrides) => ReturnType<ConfigFn>

export const yml: YmlConfig = async (options) => {
  const { overrides = {} } = options

  const [pluginYml, parserYml] = await Promise.all([
    interopDefault(import('eslint-plugin-yml')),
    interopDefault(import('yaml-eslint-parser')),
  ] as const)

  return [
    {
      name: 'eslint/yaml/setup',
      plugins: {
        yml: pluginYml,
      },
    },
    {
      name: 'eslint/yaml/rules',
      files: [GLOB_YAML],
      languageOptions: {
        parser: parserYml,
      },
      rules: {
        // recommended rules
        'yml/no-empty-document': 'error',
        'yml/no-empty-key': 'error',
        'yml/no-empty-mapping-value': 'error',
        'yml/no-empty-sequence-entry': 'error',
        'yml/no-irregular-whitespace': 'error',
        'yml/no-tab-indent': 'error',
        'yml/vue-custom-block/no-parsing-error': 'error',

        // standard rules
        'yml/block-mapping-colon-indicator-newline': 'error',
        'yml/block-mapping-question-indicator-newline': 'error',
        'yml/block-mapping': 'error',
        'yml/block-sequence-hyphen-indicator-newline': 'error',
        'yml/block-sequence': 'error',
        'yml/flow-mapping-curly-newline': 'error',
        'yml/flow-mapping-curly-spacing': 'error',
        'yml/flow-sequence-bracket-newline': 'error',
        'yml/flow-sequence-bracket-spacing': 'error',
        'yml/indent': 'error',
        'yml/key-spacing': 'error',
        'yml/no-multiple-empty-lines': 'error',
        'yml/no-trailing-zeros': 'error',
        'yml/plain-scalar': 'error',
        'yml/quotes': 'error',
        'yml/spaced-comment': 'error',

        ...overrides,
      },
    },
  ]
}
