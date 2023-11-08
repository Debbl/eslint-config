import type { ConfigItem, ReactOptions } from "../types";
import { pluginNext, pluginReact, pluginReactHooks } from "../plugins";
import { combine } from "../utils";

function next(): ConfigItem[] {
  return [
    {
      name: "eslint:next",
      plugins: {
        "@next/next": pluginNext,
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

  const _react = {
    name: "eslint:react",
    plugins: {
      "react": pluginReact,
      "react-hooks": pluginReactHooks,
    },
    settings: {
      react: {
        version: "18.0",
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
