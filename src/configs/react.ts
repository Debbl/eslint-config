import type { ConfigItem } from "../types";
import { pluginReact, pluginReactHooks } from "../plugins";

export function react(): ConfigItem[] {
  return [
    {
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
    },
  ];
}
