import type { Awaitable, ConfigItem } from './types'

export const parserPlain = {
  meta: {
    name: 'parser-plain',
  },
  parseForESLint: (code: string) => ({
    ast: {
      body: [],
      comments: [],
      loc: { end: code.length, start: 0 },
      range: [0, code.length],
      tokens: [],
      type: 'Program',
    },
    scopeManager: null,
    services: { isPlain: true },
    visitorKeys: {
      Program: [],
    },
  }),
}

/**
 * Combine array and non-array configs into a single array.
 */
export async function combine(...configs: Awaitable<ConfigItem | ConfigItem[]>[]): Promise<ConfigItem[]> {
  const resolved = await Promise.all(configs)
  return resolved.flat()
}

export async function interopDefault<T>(m: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await m
  return (resolved as any).default || resolved
}

export function getConfigOptions<T>(options: T) {
  return options ? (typeof options !== 'boolean' ? options : {}) : {}
}
