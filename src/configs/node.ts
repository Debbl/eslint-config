import type { ConfigItem } from "../types";
import { interopDefault } from "../utils";

export async function node(): Promise<ConfigItem[]> {
  // @ts-expect-error missing types
  const pluginNode = await interopDefault(import("eslint-plugin-n"));

  return [
    {
      name: "eslint:node",
      plugins: {
        n: pluginNode,
      },
      rules: {
        "n/handle-callback-err": ["error", "^(err|error)$"],
        "n/no-deprecated-api": "error",
        "n/no-exports-assign": "error",
        "n/no-new-require": "error",
        "n/no-path-concat": "error",
        "n/prefer-global/buffer": ["error", "never"],
        "n/prefer-global/process": ["error", "never"],
        "n/process-exit-as-throw": "error",
      },
    },
  ];
}
