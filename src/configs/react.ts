import type { ConfigItem, ReactOptions } from "../types";
import { pluginNext, pluginReact, pluginReactHooks } from "../plugins";
import { combine } from "../utils";
import { GLOB_JSX, GLOB_TSX } from "../globs";

function next(): ConfigItem[] {
  return [
    {
      name: "eslint:next",
      files: [GLOB_TSX, GLOB_JSX],
      languageOptions: {
        parserOptions: {
          sourceType: "module",
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      plugins: {
        "@next/next": pluginNext,
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

export function react(options: ReactOptions = {}): ConfigItem[] {
  const { next: enableNext = false } = options;

  const _react: ConfigItem = {
    name: "eslint:react",
    files: [GLOB_TSX, GLOB_JSX],
    languageOptions: {
      parserOptions: {
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "react": pluginReact,
      "react-hooks": pluginReactHooks,
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
  };

  return combine(_react, enableNext ? next() : []);
}
