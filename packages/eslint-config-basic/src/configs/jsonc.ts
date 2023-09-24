import type { FlatESLintConfigItem } from "eslint-define-config";
import { parserJsonc, pluginJsonc } from "src/plugins";
import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from "../../../../src/globs";

export const jsonc: FlatESLintConfigItem[] = [
  {
    files: [GLOB_JSON, GLOB_JSON5, GLOB_JSONC],
    languageOptions: {
      parser: parserJsonc,
    },
    plugins: {
      jsonc: pluginJsonc,
    },
    rules: {
      ...(pluginJsonc.configs["recommended-with-jsonc"].rules as any),

      "jsonc/array-bracket-spacing": ["error", "never"],
      "jsonc/comma-dangle": ["error", "never"],
      "jsonc/comma-style": ["error", "last"],
      "jsonc/indent": ["error", 2],
      "jsonc/key-spacing": ["error", { afterColon: true, beforeColon: false }],
      "jsonc/no-octal-escape": "error",
      "jsonc/object-curly-newline": [
        "error",
        { consistent: true, multiline: true },
      ],
      "jsonc/object-curly-spacing": ["error", "always"],
      "jsonc/object-property-newline": [
        "error",
        { allowMultiplePropertiesPerLine: true },
      ],
    },
  },
];
