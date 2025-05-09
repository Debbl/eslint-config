import { interopDefault } from '../utils'
import type { ConfigItem } from '../types'

export async function imports(): Promise<ConfigItem[]> {
  const pluginImport = await interopDefault(import('eslint-plugin-import-x'))

  return [
    {
      name: 'eslint/imports/rules',
      plugins: {
        import: pluginImport,
      },
      rules: {
        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',
        'import/no-self-import': 'error',
        'import/no-webpack-loader-syntax': 'error',

        'import/newline-after-import': ['error', { count: 1 }],
        'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      },
    },
  ]
}
