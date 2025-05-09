import { interopDefault } from '../utils'
import type { ConfigItem } from '../types'

export async function unicorn(): Promise<ConfigItem[]> {
  const pluginUnicorn = await interopDefault(import('eslint-plugin-unicorn'))

  return [
    {
      name: 'eslint/unicorn/rules',
      plugins: {
        unicorn: pluginUnicorn,
      },
      rules: {
        'unicorn/consistent-empty-array-spread': 'error',
        'unicorn/escape-case': 'error',
        'unicorn/new-for-builtins': 'error',
        // Pass error message when throwing errors
        'unicorn/error-message': 'error',
        // Uppercase regex escapes
        'unicorn/consistent-function-scoping': ['error', { checkArrowFunctions: false }],
        'unicorn/no-instanceof-builtins': 'error',
        // Ban `new Array` as `Array` constructor's params are ambiguous
        'unicorn/no-new-array': 'error',
        // Prevent deprecated `new Buffer()`
        'unicorn/no-new-buffer': 'error',
        // Lowercase number formatting for octal, hex, binary (0x1'error' instead of 0X1'error')
        'unicorn/number-literal-case': 'error',
        // textContent instead of innerText
        'unicorn/prefer-dom-node-text-content': 'error',
        // includes over indexOf when checking for existence
        'unicorn/prefer-includes': 'error',
        // Prefer using the node: protocol
        'unicorn/prefer-node-protocol': 'error',
        // Prefer using number properties like `Number.isNaN` rather than `isNaN`
        'unicorn/prefer-number-properties': 'error',
        // String methods startsWith/endsWith instead of more complicated stuff
        'unicorn/prefer-string-starts-ends-with': 'error',
        // Enforce throwing type error when throwing error while checking typeof
        'unicorn/prefer-type-error': 'error',
        // Use new when throwing error
        'unicorn/throw-new-error': 'error',
      },
    },
  ]
}
