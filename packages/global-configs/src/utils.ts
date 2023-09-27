import type { FlatESLintConfigItem } from "eslint-define-config";

/**
 * Combine array and non-array configs into a single array.
 * @param configs
 */
export function combine(
  ...configs: (FlatESLintConfigItem | FlatESLintConfigItem[])[]
): FlatESLintConfigItem[] {
  return configs.flatMap((config) =>
    Array.isArray(config) ? config : [config],
  );
}
