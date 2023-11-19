import type { ConfigItem } from "../types";
import { interopDefault } from "../utils";

export async function imports(): Promise<ConfigItem[]> {
  const [pluginAntfu, pluginImport] = await Promise.all([
    interopDefault(import("eslint-plugin-antfu")),
    // @ts-expect-error missing types
    interopDefault(import("eslint-plugin-i")),
  ]);

  return [
    {
      name: "eslint:imports",
      plugins: {
        antfu: pluginAntfu,
        import: pluginImport,
      },
      rules: {
        "antfu/import-dedupe": "error",
        "antfu/no-import-node-modules-by-path": "error",

        "import/first": "error",
        "import/no-duplicates": "error",
        "import/no-mutable-exports": "error",
        "import/no-named-default": "error",
        "import/no-self-import": "error",
        "import/no-webpack-loader-syntax": "error",
        "import/order": "error",

        "import/newline-after-import": [
          "error",
          { considerComments: true, count: 1 },
        ],
      },
    },
  ];
}
