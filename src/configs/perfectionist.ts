import { interopDefault } from '../utils'
import type { ConfigItem } from '../types'

/**
 * Perfectionist plugin for props and items sorting.
 *
 * @see https://github.com/azat-io/eslint-plugin-perfectionist
 */
export async function perfectionist(): Promise<ConfigItem[]> {
  const pluginPerfectionist = await interopDefault(import('eslint-plugin-perfectionist'))

  return [
    {
      name: 'eslint/perfectionist/setup',
      plugins: {
        perfectionist: pluginPerfectionist,
      },
      rules: {
        'perfectionist/sort-exports': ['error', { order: 'asc', type: 'natural' }],
        'perfectionist/sort-imports': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'side-effect',
              'side-effect-style',
              'index',
              'object',
              'style',
              'builtin-type',
              'external-type',
              'internal-type',
              'parent-type',
              'sibling-type',
              'index-type',
              'type',
              'unknown',
            ],
            newlinesBetween: 'never',
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-named-exports': ['error', { order: 'asc', type: 'natural' }],
        'perfectionist/sort-named-imports': ['error', { order: 'asc', type: 'natural' }],
      },
    },
  ]
}
