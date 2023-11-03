import type { ConfigItem } from "../types";

import { pluginPerfectionist } from "../plugins";

/**
 * Optional sort-keys plugin
 *
 * @see https://github.com/azat-io/eslint-plugin-perfectionist/
 */
export function perfectionist(): ConfigItem[] {
  return [
    {
      name: "eslint:perfectionist",
      plugins: {
        perfectionist: pluginPerfectionist,
      },
    },
  ];
}
