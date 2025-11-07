import { interopDefault } from '../utils'
import type { ConfigFn, ConfigItem, OptionsOverrides } from '../types'

export type TailwindcssConfig = (
  options: {
    settings?: {
      entryPoint?: string
      tailwindConfig?: string
      tsconfig?: string
      attributes?: string[]
      callees?: string[]
      variables?: string[]
    }
  } & OptionsOverrides,
) => ReturnType<ConfigFn>

export const tailwindcss: TailwindcssConfig = async (
  options,
): Promise<ConfigItem[]> => {
  const { overrides = {} } = options
  const pluginBetterTailwindcss = await interopDefault(
    import('eslint-plugin-better-tailwindcss'),
  )

  return [
    {
      name: 'eslint/better-tailwindcss/rules',
      settings: {
        entryPoint: 'src/global.css',
        ...options.settings,
      },
      plugins: {
        'better-tailwindcss': pluginBetterTailwindcss,
      },
      rules: {
        'better-tailwindcss/no-unregistered-classes': 'warn',
        'better-tailwindcss/no-conflicting-classes': 'warn',
        'better-tailwindcss/no-unnecessary-whitespace': 'warn',
        'better-tailwindcss/no-duplicate-classes': 'warn',
        'better-tailwindcss/enforce-consistent-class-order': 'warn',

        ...overrides,
      },
    },
  ]
}
