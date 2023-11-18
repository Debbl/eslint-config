import type { ConfigItem, PrettierRequiredOptions } from "../types";
import { configPrettier, pluginPrettier } from "../plugins";

export function prettier(options: PrettierRequiredOptions): ConfigItem[] {
  return [
    {
      name: "eslint:prettier",
      plugins: {
        prettier: pluginPrettier,
      },
      rules: {
        ...configPrettier.rules,
        ...(pluginPrettier.configs!.recommended as any).rules,

        "prettier/prettier": [
          "warn",
          {
            quoteProps: "consistent",
            endOfLine: "lf",

            ...options,
          },
        ],
      },
    },
  ];
}
