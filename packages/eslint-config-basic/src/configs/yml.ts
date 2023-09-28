import type { FlatESLintConfigItem } from "eslint-define-config";
import { parserYml, pluginYml } from "src/plugins";
import type { OptionsOverrides } from "../types";
import { GLOB_YAML } from "../globs";
import { OFF } from "../flags";

export const yml = (options: OptionsOverrides = {}): FlatESLintConfigItem[] => {
  const { overrides = {} } = options;

  return [
    {
      files: [GLOB_YAML],
      languageOptions: {
        parser: parserYml,
      },
      plugins: {
        yml: pluginYml as any,
      },
      rules: {
        ...(pluginYml.configs.standard.rules as any),

        "yml/no-empty-document": OFF,
        "yml/no-empty-mapping-value": OFF,

        "yml/quotes": ["error", { avoidEscape: false, prefer: "double" }],

        ...overrides,
      },
    },
  ];
};
