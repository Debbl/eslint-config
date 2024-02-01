import process from "node:process";
import pluginTs from "@typescript-eslint/eslint-plugin";
import parserTs from "@typescript-eslint/parser";
import type {
  ConfigFn,
  ConfigItem,
  OptionsComponentExts,
  OptionsOverrides,
  OptionsTypeScriptParserOptions,
  OptionsTypeScriptWithTypes,
} from "../types";
import { GLOB_SRC } from "../globs";

export type TypeScriptConfig = (
  options?: OptionsComponentExts &
    OptionsTypeScriptWithTypes &
    OptionsTypeScriptParserOptions &
    OptionsOverrides,
) => ReturnType<ConfigFn>;

const typeAwareRules: ConfigItem["rules"] = {
  "dot-notation": "off",
  "no-implied-eval": "off",
  "no-throw-literal": "off",
  "@typescript-eslint/await-thenable": "error",
  "@typescript-eslint/dot-notation": ["error", { allowKeywords: true }],
  "@typescript-eslint/no-floating-promises": "error",
  "@typescript-eslint/no-for-in-array": "error",
  "@typescript-eslint/no-implied-eval": "error",
  "@typescript-eslint/no-misused-promises": "error",
  "@typescript-eslint/no-throw-literal": "error",
  "@typescript-eslint/no-unnecessary-type-assertion": "error",
  "@typescript-eslint/no-unsafe-argument": "error",
  "@typescript-eslint/no-unsafe-assignment": "error",
  "@typescript-eslint/no-unsafe-call": "error",
  "@typescript-eslint/no-unsafe-member-access": "error",
  "@typescript-eslint/no-unsafe-return": "error",
  "@typescript-eslint/restrict-plus-operands": "error",
  "@typescript-eslint/restrict-template-expressions": "error",
  "@typescript-eslint/unbound-method": "error",
};

export const typescript: TypeScriptConfig = (options) => {
  const {
    overrides = {},
    componentExts = [],
    parserOptions = {},
    tsconfigPath,
  } = options ?? {};

  return [
    {
      // Install the plugins without globs, so they can be configured separately.
      name: "eslint:typescript:setup",
      plugins: {
        "@typescript-eslint": pluginTs,
      },
    },
    {
      name: "eslint:typescript:rules",
      files: [GLOB_SRC, ...componentExts.map((ext) => `**/*.${ext}`)],
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          extraFileExtensions: componentExts.map((ext) => `.${ext}`),
          sourceType: "module",

          ...(tsconfigPath
            ? {
                project: [tsconfigPath],
                tsconfigRootDir: process.cwd(),
              }
            : {}),
          ...(parserOptions as any),
        },
      },
      rules: {
        ...pluginTs.configs["eslint-recommended"].overrides![0].rules!,
        ...pluginTs.configs.strict.rules!,

        "no-dupe-class-members": "off",
        "no-invalid-this": "off",
        "no-loss-of-precision": "off",
        "no-redeclare": "off",
        "no-use-before-define": "off",
        "no-useless-constructor": "off",
        "@typescript-eslint/ban-ts-comment": [
          "error",
          { "ts-ignore": "allow-with-description" },
        ],
        "@typescript-eslint/ban-types": [
          "error",
          { types: { Function: false } },
        ],
        "@typescript-eslint/consistent-type-definitions": [
          "error",
          "interface",
        ],
        "@typescript-eslint/consistent-type-imports": [
          "error",
          { disallowTypeAnnotations: false, prefer: "type-imports" },
        ],
        "@typescript-eslint/no-dupe-class-members": "error",
        "@typescript-eslint/no-dynamic-delete": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-extraneous-class": "off",
        "@typescript-eslint/no-import-type-side-effects": "error",
        "@typescript-eslint/no-invalid-this": "error",
        "@typescript-eslint/no-invalid-void-type": "off",
        "@typescript-eslint/no-loss-of-precision": "error",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-redeclare": "error",
        "@typescript-eslint/no-require-imports": "error",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-use-before-define": [
          "error",
          { classes: false, functions: false, variables: true },
        ],
        "@typescript-eslint/no-useless-constructor": "off",
        "@typescript-eslint/prefer-ts-expect-error": "error",
        "@typescript-eslint/triple-slash-reference": "off",
        "@typescript-eslint/unified-signatures": "off",

        ...(tsconfigPath ? typeAwareRules : {}),
        ...overrides,
      },
    },
    {
      name: "eslint:typescript:dts-overrides",
      files: ["**/*.d.ts"],
      rules: {
        "eslint-comments/no-unlimited-disable": "off",
        "import/no-duplicates": "off",
        "no-restricted-syntax": "off",
        "unused-imports/no-unused-vars": "off",
      },
    },
    {
      name: "eslint:typescript:tests-overrides",
      files: ["**/*.{test,spec}.ts?(x)"],
      rules: {
        "no-unused-expressions": "off",
      },
    },
    {
      files: ["**/*.js", "**/*.cjs"],
      name: "eslint:typescript:javascript-overrides",
      rules: {
        "@typescript-eslint/no-require-imports": "off",
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ];
};
