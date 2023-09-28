import type { FlatESLintConfigItem } from "eslint-define-config";
import { pluginComments } from "src/plugins";

export const comments: FlatESLintConfigItem[] = [
  {
    plugins: {
      "eslint-comments": pluginComments,
    },
    rules: {
      ...pluginComments.configs.recommended.rules,
      "eslint-comments/no-aggregating-enable": "error",
      "eslint-comments/no-duplicate-disable": "error",
      "eslint-comments/no-unlimited-disable": "error",
      "eslint-comments/no-unused-enable": "error",
    },
  },
];
