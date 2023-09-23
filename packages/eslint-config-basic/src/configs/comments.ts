import type { FlatESLintConfigItem } from "eslint-define-config";
import { pluginComments } from "src/plugins";
import { OFF } from "../../../../src/flags";

export const comments: FlatESLintConfigItem[] = [
  {
    plugins: {
      "eslint-comments": pluginComments,
    },
    rules: {
      ...pluginComments.configs.recommended.rules,
      "eslint-comments/disable-enable-pair": OFF,
    },
  },
];
