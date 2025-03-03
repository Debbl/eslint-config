import { getConfigOptions, interopDefault } from "~/utils";
import { GLOB_EXCLUDE } from "../globs";
import type { FlatGitignoreOptions } from "eslint-config-flat-gitignore";
import type { ConfigFn } from "../types";

export type IgnoresConfig = (options: {
  enableGitignore?: boolean | Omit<FlatGitignoreOptions, "name">;
  files?: ((files: string[]) => string[]) | string[];
}) => ReturnType<ConfigFn>;

export const ignores: IgnoresConfig = async (options) => {
  const { enableGitignore = true, files = [] } = options;

  const gitIgnores: string[] = [];
  if (enableGitignore) {
    const gitignore = await interopDefault(
      import("eslint-config-flat-gitignore"),
    );

    gitIgnores.push(...gitignore(getConfigOptions(enableGitignore)).ignores);
  }

  let ignores = [...GLOB_EXCLUDE, ...gitIgnores];

  if (typeof files === "function") {
    ignores = files(ignores);
  } else {
    ignores = [...ignores, ...files];
  }

  return [
    {
      name: "eslint/ignores",
      ignores: [...GLOB_EXCLUDE, ...ignores],
    },
  ];
};
