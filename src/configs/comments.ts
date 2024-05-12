import { interopDefault } from "../utils";
import type { ConfigItem } from "../types";

export async function comments(): Promise<ConfigItem[]> {
  const pluginComments = await interopDefault(
    // @ts-expect-error missing types
    import("eslint-plugin-eslint-comments"),
  );

  return [
    {
      name: "eslint/eslint-comments/rules",
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
