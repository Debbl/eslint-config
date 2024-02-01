import type { RequiredOptions } from "prettier";

import pluginPrettier from "eslint-plugin-prettier";

// @ts-expect-error missing types
import configPrettier from "eslint-config-prettier";
import { parseForESLint } from "eslint-parser-plain";
import {
  GLOB_CSS,
  GLOB_LESS,
  GLOB_MARKDOWN,
  GLOB_MDX,
  GLOB_POSTCSS,
  GLOB_SCSS,
  GLOB_TOML,
  GLOB_YAML,
} from "../globs";
import type { ConfigItem } from "../types";

export type PrettierRequiredOptions = Partial<RequiredOptions>;

export type PrettierConfig = (options: PrettierRequiredOptions) => ConfigItem[];

export const prettier: PrettierConfig = (options) => {
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
      parser: {
        parseForESLint,
      },
    },
    rules: {
      "prettier/prettier": [
        "warn",
        {
          parser: rule.parser,

          quoteProps: "consistent",
          ...options,
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
      ignores: [GLOB_TOML],
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
};
