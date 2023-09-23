import { type FlatESLintConfigItem } from "eslint-define-config";
import { pluginSolid } from "../plugins";

export const solid: FlatESLintConfigItem[] = [
  {
    plugins: {
      solid: pluginSolid,
    },
    rules: {
      ...pluginSolid.configs.recommended,
      ...pluginSolid.configs.typescript,
    },
  },
];
