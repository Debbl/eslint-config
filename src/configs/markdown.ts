import type { ConfigItem, OptionsComponentExts } from "../types";
import { GLOB_MARKDOWN, GLOB_MARKDOWN_CODE } from "../globs";
import { interopDefault } from "../utils";

export async function markdown(
  options: OptionsComponentExts = {},
): Promise<ConfigItem[]> {
  const { componentExts = [] } = options;

  return [
    {
      name: "eslint:markdown:setup",
      plugins: {
        // @ts-expect-error missing types
        markdown: await interopDefault(import("eslint-plugin-markdown")),
      },
    },
    {
      name: "eslint:markdown:processor",
      files: [GLOB_MARKDOWN],
      processor: "markdown/markdown",
    },
    {
      name: "eslint:markdown:rules",
      files: [
        GLOB_MARKDOWN_CODE,
        ...componentExts.map((ext) => `${GLOB_MARKDOWN}/**/*.${ext}`),
      ],
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            impliedStrict: true,
          },
        },
      },
      rules: {
        "antfu/no-cjs-exports": "off",
        "antfu/no-ts-export-equal": "off",

        "no-alert": "off",
        "no-console": "off",
        "no-undef": "off",
        "no-unused-expressions": "off",
        "no-unused-vars": "off",

        "node/prefer-global/process": "off",

        "style/comma-dangle": "off",
        "style/eol-last": "off",

        "@typescript-eslint/consistent-type-imports": "off",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-redeclare": "off",
        "@typescript-eslint/no-require-imports": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-var-requires": "off",

        "unicode-bom": "off",
        "unused-imports/no-unused-imports": "off",
        "unused-imports/no-unused-vars": "off",

        // Type aware rules
        ...{
          "@typescript-eslint/await-thenable": "off",
          "@typescript-eslint/dot-notation": "off",
          "@typescript-eslint/no-floating-promises": "off",
          "@typescript-eslint/no-for-in-array": "off",
          "@typescript-eslint/no-implied-eval": "off",
          "@typescript-eslint/no-misused-promises": "off",
          "@typescript-eslint/no-throw-literal": "off",
          "@typescript-eslint/no-unnecessary-type-assertion": "off",
          "@typescript-eslint/no-unsafe-argument": "off",
          "@typescript-eslint/no-unsafe-assignment": "off",
          "@typescript-eslint/no-unsafe-call": "off",
          "@typescript-eslint/no-unsafe-member-access": "off",
          "@typescript-eslint/no-unsafe-return": "off",
          "@typescript-eslint/restrict-plus-operands": "off",
          "@typescript-eslint/restrict-template-expressions": "off",
          "@typescript-eslint/unbound-method": "off",
        },
      },
    },
  ];
}
