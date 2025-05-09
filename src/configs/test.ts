import { GLOB_TESTS } from '../globs'
import { interopDefault } from '../utils'
import type { ConfigFn } from '../types'

export type TestConfig = ConfigFn

export const test: TestConfig = async (options) => {
  const { overrides = {} } = options

  const [pluginVitest, pluginNoOnlyTests] = await Promise.all([
    interopDefault(import('@vitest/eslint-plugin')),
    // @ts-expect-error missing types
    interopDefault(import('eslint-plugin-no-only-tests')),
  ] as const)

  return [
    {
      name: 'eslint/test/setup',
      plugins: {
        test: {
          ...pluginVitest,
          rules: {
            ...pluginVitest.rules,
            // extend `test/no-only-tests` rule
            ...pluginNoOnlyTests.rules,
          },
        },
      },
    },
    {
      name: 'eslint/test/rules',
      files: GLOB_TESTS,
      rules: {
        'node/prefer-global/process': 'off',

        'test/consistent-test-it': ['error', { fn: 'it', withinDescribe: 'it' }],
        'test/no-identical-title': 'error',
        'test/no-import-node-test': 'error',
        'test/no-only-tests': 'error',
        'test/prefer-hooks-in-order': 'error',
        'test/prefer-lowercase-title': 'error',

        '@typescript-eslint/explicit-function-return-type': 'off',

        ...overrides,
      },
    },
  ]
}
