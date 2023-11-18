import type { Awaitable, ConfigItem } from ".";

/**
 * Combine array and non-array configs into a single array.
 */
export async function combine(
  ...configs: Awaitable<ConfigItem | ConfigItem[]>[]
): Promise<ConfigItem[]> {
  const resolved = await Promise.all(configs);
  return resolved.flat();
}

export async function interopDefault<T>(
  m: Awaitable<T>,
): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await m;
  return (resolved as any).default || resolved;
}
