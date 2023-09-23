import { type FlatESLintConfigItem } from "eslint-define-config";
import { configPrettier, pluginPrettier } from "../plugins";

export const prettier: FlatESLintConfigItem[] = [
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      ...configPrettier.rules,
      ...pluginPrettier.configs.recommended.rules,
      "prettier/prettier": [
        "warn",
        {
          quoteProps: "consistent",
        },
      ],
    },
  },
];
