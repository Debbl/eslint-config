import { GLOB_TOML } from '..'
import { interopDefault } from '../utils'
import type { ConfigFn } from '..'

export type TomlConfig = ConfigFn

export const toml: TomlConfig = async (options) => {
  const { overrides = {} } = options

  const [pluginToml, parserToml] = await Promise.all([
    interopDefault(import('eslint-plugin-toml')),
    interopDefault(import('toml-eslint-parser')),
  ] as const)

  return [
    {
      name: 'eslint/toml/setup',
      plugins: {
        toml: pluginToml,
      },
    },
    {
      name: 'eslint/toml/rules',
      files: [GLOB_TOML],
      languageOptions: {
        parser: parserToml,
      },
      rules: {
        'toml/comma-style': 'error',
        'toml/keys-order': 'error',
        'toml/no-space-dots': 'error',
        'toml/no-unreadable-number-separator': 'error',
        'toml/precision-of-fractional-seconds': 'error',
        'toml/precision-of-integer': 'error',
        'toml/tables-order': 'error',

        'toml/vue-custom-block/no-parsing-error': 'error',

        'toml/array-bracket-newline': 'error',
        'toml/array-bracket-spacing': 'error',
        'toml/array-element-newline': 'error',
        'toml/indent': ['error', 2],
        'toml/inline-table-curly-spacing': 'error',
        'toml/key-spacing': 'error',
        'toml/padding-line-between-pairs': 'error',
        'toml/padding-line-between-tables': 'error',
        'toml/quoted-keys': 'error',
        'toml/spaced-comment': 'error',
        'toml/table-bracket-spacing': 'error',

        ...overrides,
      },
    },
  ]
}
