import type { ConfigItem, PrettierRequiredOptions } from "../types";
import { GLOB_MARKDOWN, GLOB_MDX } from "../globs";
import { interopDefault } from "../utils";

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
      name: "eslint:prettier:setup",
      plugins: {
        prettier: pluginPrettier,
      },
    },
    {
      name: "eslint:prettier:rules",
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
    {
      name: "eslint:prettier:markdown",
      files: [GLOB_MARKDOWN],
      rules: {
        "prettier/prettier": [
          "warn",
          {
            parser: "markdown",
          },
        ],
      },
    },
    {
      name: "eslint:prettier:mdx",
      files: [GLOB_MDX],
      rules: {
        "prettier/prettier": [
          "warn",
          {
            parser: "mdx",
          },
        ],
      },
    },
  ];
}
