import pluginPerfectionist from "eslint-plugin-perfectionist";
import type { ConfigItem } from "../types";

// @ts-expect-error missing types

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
