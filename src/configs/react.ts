import pluginNext from "@next/eslint-plugin-next";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import type { ConfigFn, ConfigItem, OptionsOverrides } from "../types";
import { combine } from "../utils";
import { GLOB_JSX, GLOB_TSX } from "../globs";

// @ts-expect-error missing types
// @ts-expect-error missing types

// @ts-expect-error missing types

export type ReactConfig = (
  options: {
    next?: boolean;
  } & OptionsOverrides,
) => ReturnType<ConfigFn>;

function next(): ConfigItem[] {
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

export const react: ReactConfig = (options): ConfigItem[] => {
  const { next: enableNext = false, overrides = {} } = options;

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

        ...overrides,
      },
    },
  ];

  return combine(_react, enableNext ? next() : []);
};
