import type { RequiredOptions } from "prettier";
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
import { interopDefault, parserPlain } from "../utils";
import type { ConfigItem } from "../types";

export type PrettierRequiredOptions = Partial<RequiredOptions>;

export type PrettierConfig = ({
  options,
}: PrettierRequiredOptions & {
  tailwindcss?: boolean;
}) => Promise<ConfigItem[]>;

export const prettier: PrettierConfig = async ({ tailwindcss, ...options }) => {
  const [pluginPrettier, configPrettier] = await Promise.all([
    interopDefault(import("eslint-plugin-prettier")),
    // @ts-expect-error missing types
    interopDefault(import("eslint-config-prettier")),
  ]);

  const PlainFileRules: ConfigItem[] = [
    {
      name: "eslint/prettier/markdown",
      files: [GLOB_MARKDOWN],
      parser: "markdown",
    },
    {
      name: "eslint/prettier/mdx",
      files: [GLOB_MDX],
      parser: "mdx",
    },
    {
      name: "eslint/prettier/html",
      files: ["**/*.html"],
      parser: "html",
    },
    {
      name: "eslint/prettier/css",
      files: [GLOB_CSS, GLOB_POSTCSS],
      parser: "css",
    },
    {
      name: "eslint/prettier/scss",
      files: [GLOB_SCSS],
      parser: "scss",
    },
    {
      name: "eslint/prettier/less",
      files: [GLOB_LESS],
      parser: "less",
    },
    {
      name: "eslint/prettier/yaml",
      files: [GLOB_YAML],
      parser: "yaml",
    },
    {
      name: "eslint/prettier/graphql",
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
          parser: rule.parser,

          quoteProps: "consistent",
          ...options,
        },
      ],
    },
  }));

  return [
    {
      name: "eslint/prettier/setup",
      plugins: {
        prettier: pluginPrettier,
      },
    },
    {
      name: "eslint/prettier/rules",
      ignores: [GLOB_TOML],
      rules: {
        // disable rules with prettier conflicts
        ...configPrettier.rules,

        // eslint-plugin-prettier recommended rules
        ...{
          "prettier/prettier": "error",
          "arrow-body-style": "off",
          "prefer-arrow-callback": "off",
        },

        "prettier/prettier": [
          "warn",
          {
            plugins: tailwindcss ? ["prettier-plugin-tailwindcss"] : [],
            quoteProps: "consistent",
            ...options,
          },
        ],
      },
    },

    ...PlainFileRules,
  ];
};
