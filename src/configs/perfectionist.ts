import type { ConfigItem } from "../types";
import { interopDefault } from "../utils";

/**
 * Perfectionist plugin for props and items sorting.
 *
 * @see https://github.com/azat-io/eslint-plugin-perfectionist
 */
export async function perfectionist(): Promise<ConfigItem[]> {
  const pluginPerfectionist = await interopDefault(
    import("eslint-plugin-perfectionist"),
  );

  return [
    {
      name: "eslint/perfectionist/setup",
      plugins: {
        perfectionist: pluginPerfectionist,
      },
      rules: {
        "perfectionist/sort-exports": [
          "error",
          { order: "asc", type: "natural" },
        ],
        "perfectionist/sort-imports": [
          "error",
          {
            groups: [
              "builtin",
              "external",
              "type",
              ["internal", "internal-type"],
              ["parent", "sibling", "index"],
              ["parent-type", "sibling-type", "index-type"],
              "side-effect",
              "object",
              "unknown",
            ],
            newlinesBetween: "ignore",
            order: "asc",
            type: "natural",
          },
        ],
        "perfectionist/sort-named-exports": [
          "error",
          { order: "asc", type: "natural" },
        ],
        "perfectionist/sort-named-imports": [
          "error",
          { order: "asc", type: "natural" },
        ],
      },
    },
  ];
}
