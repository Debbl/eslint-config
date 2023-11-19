import type { ConfigItem } from "../types";
import { GLOB_YAML } from "../globs";
import { interopDefault } from "../utils";

export async function yml(): Promise<ConfigItem[]> {
  const [pluginYml, parserYml] = await Promise.all([
    interopDefault(import("eslint-plugin-yml")),
    interopDefault(import("yaml-eslint-parser")),
  ] as const);

  return [
    {
      name: "eslint:yaml:setup",
      plugins: {
        yml: pluginYml,
      },
    },
    {
      name: "eslint:yaml:rules",
      files: [GLOB_YAML],
      languageOptions: {
        parser: parserYml,
      },
      rules: {
        ...(pluginYml.configs.standard.rules as any),
        ...(pluginYml.configs.prettier.rules as any),

        "yml/block-mapping": "error",
        "yml/block-sequence": "error",
        "yml/no-empty-key": "error",
        "yml/no-empty-sequence-entry": "error",
        "yml/no-irregular-whitespace": "error",
        "yml/plain-scalar": "error",

        "yml/vue-custom-block/no-parsing-error": "error",

        "yml/spaced-comment": "error",
      },
    },
  ];
}
