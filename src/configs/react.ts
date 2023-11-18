import type { ConfigItem, ReactOptions } from "../types";
import { combine, interopDefault } from "../utils";
import { GLOB_JSX, GLOB_TSX } from "../globs";

async function next(): Promise<ConfigItem[]> {
  // @ts-expect-error missing types
  const pluginNext = await interopDefault(import("@next/eslint-plugin-next"));

  return [
    {
      name: "eslint:next:setup",
      plugins: {
        "@next/next": pluginNext,
      },
    },
    {
      name: "eslint:next:rules",
      files: [GLOB_TSX, GLOB_JSX],
      languageOptions: {
        parserOptions: {
          sourceType: "module",
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      settings: {
        react: {
          version: "detect",
        },
      },
      rules: {
        ...pluginNext.configs.recommended.rules,
        ...pluginNext.configs["core-web-vitals"].rules,
      },
    },
  ];
}

export async function react(options: ReactOptions = {}): Promise<ConfigItem[]> {
  const { next: enableNext = false } = options;

  const [pluginReact, pluginReactHooks] = await Promise.all([
    // @ts-expect-error missing types
    interopDefault(import("eslint-plugin-react")),
    // @ts-expect-error missing types
    interopDefault(import("eslint-plugin-react-hooks")),
  ] as const);

  const _react: ConfigItem[] = [
    {
      name: "eslint:react:setup",
      plugins: {
        "react": pluginReact,
        "react-hooks": pluginReactHooks,
      },
    },
    {
      name: "eslint:react:rules",
      files: [GLOB_TSX, GLOB_JSX],
      languageOptions: {
        parserOptions: {
          sourceType: "module",
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      settings: {
        react: {
          version: "detect",
        },
      },
      rules: {
        ...pluginReact.configs.recommended.rules,
        ...pluginReactHooks.configs.recommended.rules,

        "jsx-quotes": ["error", "prefer-double"],
        "react/react-in-jsx-scope": "off",
        "react/jsx-indent": [1, 2],
        "react/jsx-indent-props": [1, 2],
        "react/jsx-closing-bracket-location": [
          1,
          { selfClosing: "tag-aligned", nonEmpty: "tag-aligned" },
        ],
      },
    },
  ];

  return combine(_react, enableNext ? next() : []);
}
