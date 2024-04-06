import { interopDefault } from "../utils";
import type { ConfigItem } from "../types";

/**
 * Optional sort-keys plugin
 *
 * @see https://github.com/azat-io/eslint-plugin-perfectionist/
 */
export async function perfectionist(): Promise<ConfigItem[]> {
  const pluginPerfectionist = await interopDefault(
    // @ts-expect-error missing types
    import("eslint-plugin-perfectionist"),
  );

  return [
    {
      name: "eslint/perfectionist/setup",
      plugins: {
        perfectionist: pluginPerfectionist,
      },
    },
  ];
}
