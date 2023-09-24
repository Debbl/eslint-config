import { type FlatESLintConfigItem } from "eslint-define-config";
import { pluginSolid } from "../plugins";
import type { OptionsHasTypeScript } from "../share";

export const solid = (
  options?: OptionsHasTypeScript,
): FlatESLintConfigItem[] => {
  return [
    {
      plugins: {
        solid: pluginSolid,
      },
      rules: {
        ...pluginSolid.configs.recommended,
        ...(options?.ts ? pluginSolid.configs.typescript : []),
      },
    },
  ];
};
