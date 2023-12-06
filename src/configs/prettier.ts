import type { ConfigItem, PrettierRequiredOptions } from "../types";
import {
  GLOB_CSS,
  GLOB_LESS,
  GLOB_MARKDOWN,
  GLOB_MDX,
  GLOB_POSTCSS,
  GLOB_SCSS,
  GLOB_YAML,
} from "../globs";
import { interopDefault } from "../utils";

export async function prettier(
  options: PrettierRequiredOptions,
): Promise<ConfigItem[]> {
  const [pluginPrettier, configPrettier, parserPlain] = await Promise.all([
    interopDefault(import("eslint-plugin-prettier")),
    // @ts-expect-error missing types
    interopDefault(import("eslint-config-prettier")),
    interopDefault(import("eslint-parser-plain")),
  ]);

  const PlainFileRules: ConfigItem[] = [
    {
      name: "eslint:prettier:markdown",
      files: [GLOB_MARKDOWN],
      parser: "markdown",
    },
    {
      name: "eslint:prettier:mdx",
      files: [GLOB_MDX],
      parser: "mdx",
    },
    {
      name: "eslint:prettier:html",
      files: ["**/*.html"],
      parser: "html",
    },
    {
      name: "eslint:prettier:css",
      files: [GLOB_CSS, GLOB_POSTCSS],
      parser: "css",
    },
    {
      name: "eslint:prettier:scss",
      files: [GLOB_SCSS],
      parser: "scss",
    },
    {
      name: "eslint:prettier:less",
      files: [GLOB_LESS],
      parser: "less",
    },
    {
      name: "eslint:prettier:yaml",
      files: [GLOB_YAML],
      parser: "yaml",
    },
    {
      name: "eslint:prettier:graphql",
      files: ["**/*.graphql"],
      parser: "graphql",
    },
  ].map((rule) => ({
    name: rule.name,
    files: rule.files,
    languageOptions: {
      parser: parserPlain,
    },
    rules: {
      "prettier/prettier": [
        "warn",
        {
          ...options,
          parser: rule.parser,
        },
      ],
    },
  }));

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
    ...PlainFileRules,
  ];
}
