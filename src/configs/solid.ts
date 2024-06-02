import { interopDefault } from "../utils";
import type { ConfigFn, OptionsOverrides } from "../types";

export type SolidConfig = (
  options: {
    enableTypeScript: true;
  } & OptionsOverrides,
) => ReturnType<ConfigFn>;

export const solid: SolidConfig = async () => {
  const pluginSolid = await interopDefault(import("eslint-plugin-solid"));

  return [
    {
      name: "eslint/solid/rules",
      plugins: {
        solid: pluginSolid,
      },
      rules: {
        "solid/jsx-no-duplicate-props": "error",
        "solid/jsx-no-undef": "error",
        "solid/jsx-uses-vars": "error",
        "solid/no-unknown-namespaces": "error",
        "solid/no-innerhtml": "error",
        "solid/jsx-no-script-url": "error",
        "solid/components-return-once": "warn",
        "solid/no-destructure": "error",
        "solid/prefer-for": "error",
        "solid/reactivity": "warn",
        "solid/event-handlers": "warn",
        "solid/imports": "warn",
        "solid/style-prop": "warn",
        "solid/no-react-deps": "warn",
        "solid/no-react-specific-props": "warn",
        "solid/self-closing-comp": "warn",
        "solid/no-array-handlers": "off",
        "solid/prefer-show": "off",
        "solid/no-proxy-apis": "off",
        "solid/prefer-classlist": "off",
      },
    },
  ];
};
