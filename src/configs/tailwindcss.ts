import { interopDefault } from '../utils'
import type { ConfigItem } from '../types'

export async function tailwindcss(): Promise<ConfigItem[]> {
  const pluginBetterTailwindcss = await interopDefault(
    import('eslint-plugin-better-tailwindcss'),
  )

  return [
    {
      name: 'eslint/better-tailwindcss/rules',
      plugins: {
        'better-tailwindcss': pluginBetterTailwindcss,
      },
      rules: {
        ...pluginBetterTailwindcss.configs.recommended.rules,
      },
    },
  ]
}
