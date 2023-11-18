import type { ConfigItem } from "../types";

import { pluginPerfectionist } from "../plugins";

/**
 * Optional sort-keys plugin
 *
 * @see https://github.com/azat-io/eslint-plugin-perfectionist/
 */
export async function perfectionist(): Promise<ConfigItem[]> {
  return [
    {
      name: "eslint:perfectionist",
      plugins: {
        perfectionist: pluginPerfectionist,
      },
    },
  ];
}
