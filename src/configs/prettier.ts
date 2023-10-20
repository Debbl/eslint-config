import type { ConfigItem, OptionsPrettierOverrides } from "../types";
import { configPrettier, pluginPrettier } from "../plugins";

export function prettier(options: OptionsPrettierOverrides = {}): ConfigItem[] {
  const { overrides } = options;

  return [
    {
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

            ...overrides,
          },
        ],
      },
    },
  ];
}
