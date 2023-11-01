import type { ConfigItem, OptionsOverrides } from "../types";
import { GLOB_YAML } from "../globs";
import { parserYml, pluginYml } from "../plugins";

export function yml(options: OptionsOverrides = {}): ConfigItem[] {
  const { overrides = {} } = options;

  return [
    {
      name: "eslint:yaml:setup",
      plugins: {
        yml: pluginYml,
      },
    },
    {
      files: [GLOB_YAML],
      languageOptions: {
        parser: parserYml,
      },
      name: "eslint:yaml:rules",
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

        ...overrides,
      },
    },
  ];
}
