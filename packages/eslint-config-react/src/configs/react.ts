import { type FlatESLintConfigItem } from "eslint-define-config";
import { pluginReact, pluginReactHooks } from "../plugins";

export const react: FlatESLintConfigItem[] = [
  {
    plugins: {
      react: pluginReact,
      reactHooks: pluginReactHooks,
    },
    settings: {
      react: {
        version: "18.0",
      },
    },
    rules: {
      ...pluginReact.configs.recommended,
      ...pluginReactHooks.configs.recommended,

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
