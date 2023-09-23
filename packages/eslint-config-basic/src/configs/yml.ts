import type { FlatESLintConfigItem } from "eslint-define-config";
import { parserYml, pluginYml } from "src/plugins";
import { GLOB_YAML } from "../../../../src/globs";
import { OFF } from "../../../../src/flags";

export const yml: FlatESLintConfigItem[] = [
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

      "style/spaced-comment": OFF,
      "yml/no-empty-document": OFF,
      "yml/no-empty-mapping-value": OFF,

      "yml/quotes": ["error", { avoidEscape: false, prefer: "single" }],
    },
  },
];
