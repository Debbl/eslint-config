import { interopDefault } from "../utils";
import type { ConfigItem } from "../types";

export async function imports(): Promise<ConfigItem[]> {
  // @ts-expect-error missing types
  const pluginImport = await interopDefault(import("eslint-plugin-i"));

  return [
    {
      name: "eslint:imports",
      plugins: {
        import: pluginImport,
      },
      rules: {
        "import/first": "error",
        "import/no-duplicates": "error",
        "import/no-mutable-exports": "error",
        "import/no-named-default": "error",
        "import/no-self-import": "error",
        "import/no-webpack-loader-syntax": "error",
        "import/order": [
          "error",
          {
            groups: [
              "builtin",
              "external",
              "internal",
              "parent",
              "sibling",
              "index",
              "object",
              "type",
            ],
            pathGroups: [{ group: "internal", pattern: "{{@,~}/,#}**" }],
            pathGroupsExcludedImportTypes: ["type"],
          },
        ],

        "import/newline-after-import": [
          "error",
          { considerComments: true, count: 1 },
        ],
      },
    },
  ];
}
