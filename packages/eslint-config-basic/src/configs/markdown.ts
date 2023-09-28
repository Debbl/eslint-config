import type { FlatESLintConfigItem } from "eslint-define-config";
import { pluginMarkdown, pluginTs } from "src/plugins";
import { GLOB_MARKDOWN, GLOB_MARKDOWN_CODE } from "../globs";
import { OFF } from "../flags";
import type { OptionsComponentExts, OptionsOverrides } from "../types";

export function markdown(
  options: OptionsComponentExts & OptionsOverrides = {},
): FlatESLintConfigItem[] {
  const { componentExts = [], overrides = {} } = options;

  return [
    {
      files: [GLOB_MARKDOWN],
      plugins: {
        markdown: pluginMarkdown,
      },
      processor: "markdown/markdown",
    },
    {
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
      plugins: {
        "@typescript-eslint": pluginTs,
      },
      rules: {
        ...pluginMarkdown.configs.recommended.overrides[1].rules,

        "import/no-unresolved": OFF,

        "no-alert": OFF,
        "no-console": OFF,
        "no-restricted-imports": OFF,
        "no-undef": OFF,
        "no-unused-expressions": OFF,
        "no-unused-vars": OFF,

        "node/prefer-global/process": OFF,

        "@typescript-eslint/comma-dangle": OFF,
        "@typescript-eslint/consistent-type-imports": OFF,
        "@typescript-eslint/no-namespace": OFF,
        "@typescript-eslint/no-redeclare": OFF,
        "@typescript-eslint/no-unused-vars": OFF,
        "@typescript-eslint/no-use-before-define": OFF,

        "unused-imports/no-unused-imports": OFF,
        "unused-imports/no-unused-vars": OFF,

        ...overrides,
      },
    },
  ];
}
