import type { ConfigItem, PrettierRequiredOptions } from "../types";
import { interopDefault } from "..";

export async function prettier(
  options: PrettierRequiredOptions,
): Promise<ConfigItem[]> {
  const [pluginPrettier, configPrettier] = await Promise.all([
    interopDefault(import("eslint-plugin-prettier")),
    // @ts-expect-error missing types
    interopDefault(import("eslint-config-prettier")),
  ]);

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

            ...options,
          },
        ],
      },
    },
  ];
}
