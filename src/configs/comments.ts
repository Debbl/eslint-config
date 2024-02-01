// @ts-expect-error missing types
import pluginComments from "eslint-plugin-eslint-comments";
import type { ConfigItem } from "../types";

export function comments(): ConfigItem[] {
  return [
    {
      name: "eslint:eslint-comments",
      plugins: {
        "eslint-comments": pluginComments,
      },
      rules: {
        "eslint-comments/no-aggregating-enable": "error",
        "eslint-comments/no-duplicate-disable": "error",
        "eslint-comments/no-unlimited-disable": "error",
        "eslint-comments/no-unused-enable": "error",
      },
    },
  ];
}
