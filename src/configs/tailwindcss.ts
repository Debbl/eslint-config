import { interopDefault } from '../utils'
import type { ConfigItem } from '../types'

export async function tailwindcss(): Promise<ConfigItem[]> {
  const pluginTailwindcss = await interopDefault(
    // @ts-expect-error missing types
    import('eslint-plugin-tailwindcss'),
  )
  return [
    {
      name: 'eslint/tailwindcss/rules',
      plugins: {
        tailwindcss: pluginTailwindcss,
      },
      rules: {
        ...pluginTailwindcss.configs.recommended.rules,
      },
    },
  ]
}
