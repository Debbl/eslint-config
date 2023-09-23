import { type FlatESLintConfigItem } from "eslint-define-config";
import { GLOB_TS, GLOB_TSX } from "../../../../src/globs";
import { parserTs, pluginImport, pluginTs } from "../plugins";
import {
  OptionsComponentExts,
  OptionsTypeScriptWithLanguageServer,
} from "../../../../src/types";
import { OFF } from "../../../../src/flags";

export const ts: FlatESLintConfigItem[] = [
  {
    files: [GLOB_TS, GLOB_TSX],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": pluginTs,
    },
    rules: {},
  },
];

export function typescript(
  options?: OptionsComponentExts
): FlatESLintConfigItem[] {
  const { componentExts = [] } = options ?? {};

  return [
    {
      files: [GLOB_TS, GLOB_TSX, ...componentExts.map(ext => `**/*.${ext}`)],
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          sourceType: "module",
        },
      },
      plugins: {
        "import": pluginImport,
        "@typescript-eslint": pluginTs,
      },
      rules: {
        ...pluginTs.configs["eslint-recommended"].overrides![0].rules!,

        ...pluginTs.configs.strict.rules!,

        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/consistent-type-assertions": [
          "error",
          {
            assertionStyle: "as",
            objectLiteralTypeAssertions: "allow-as-parameter",
          },
        ],
        "@typescript-eslint/consistent-type-imports": [
          "error",
          { disallowTypeAnnotations: false, fixStyle: "inline-type-imports" },
        ],
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-redeclare": "error",

        // handled by unused-imports/no-unused-imports
        "@typescript-eslint/no-unused-vars": "off",

        "@typescript-eslint/prefer-as-const": "warn",
      },
    },
    {
      files: ["**/*.d.ts"],
      rules: {
        "eslint-comments/no-unlimited-disable": "off",
        "import/no-duplicates": "off",
        "unused-imports/no-unused-vars": "off",
      },
    },
    {
      files: ["**/*.{test,spec}.ts?(x)"],
      rules: {
        "no-unused-expressions": "off",
      },
    },
    {
      files: ["**/*.js", "**/*.cjs"],
      rules: {
        "@typescript-eslint/no-require-imports": "off",
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ];
}

export function tsWithLanguageServer(
  options: OptionsTypeScriptWithLanguageServer & OptionsComponentExts
): FlatESLintConfigItem[] {
  const {
    componentExts = [],
    tsconfigPath,
    // eslint-disable-next-line node/prefer-global/process
    tsconfigRootDir = process.cwd(),
  } = options;

  return [
    {
      files: [GLOB_TS, GLOB_TSX, ...componentExts.map(ext => `**/*.${ext}`)],
      ignores: ["**/*.md/*.*"],
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          project: [tsconfigPath],
          tsconfigRootDir,
        },
      },
      plugins: {
        "@typescript-eslint": pluginTs,
      },
      rules: {
        "@typescript-eslint/dot-notation": OFF,
        "no-implied-eval": OFF,
        "no-throw-literal": OFF,
        "require-await": OFF,
        "ts/await-thenable": "error",
        "ts/dot-notation": ["error", { allowKeywords: true }],
        "ts/no-floating-promises": "error",
        "ts/no-for-in-array": "error",
        "ts/no-implied-eval": "error",
        "ts/no-misused-promises": "error",
        "ts/no-throw-literal": "error",
        "ts/no-unnecessary-type-assertion": "error",
        "ts/no-unsafe-argument": "error",
        "ts/no-unsafe-assignment": "error",
        "ts/no-unsafe-call": "error",
        "ts/no-unsafe-member-access": "error",
        "ts/no-unsafe-return": "error",
        "ts/require-await": "error",
        "ts/restrict-plus-operands": "error",
        "ts/restrict-template-expressions": "error",
        "ts/unbound-method": "error",
      },
    },
  ];
}
