import type { ConfigItem } from "../types";
import { pluginSortKeys } from "../plugins";

/**
 * Optional sort-keys plugin
 *
 * @see https://github.com/namnm/eslint-plugin-sort-keys
 */
export function sortKeys(): ConfigItem[] {
  return [
    {
      name: "eslint:sort-keys",
      plugins: {
        "sort-keys": pluginSortKeys,
      },
    },
  ];
}
