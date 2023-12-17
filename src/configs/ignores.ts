import fs from "node:fs";
import path from "node:path";
import { GLOB_EXCLUDE } from "../globs";
import type { ConfigFn } from "../types";

const REGEX_SPLIT_ALL_CRLF = /\r?\n/g;
const splitPattern = (pattern: string) => pattern.split(REGEX_SPLIT_ALL_CRLF);

export type IgnoresConfig = (options: {
  enableGitignore?:
    | boolean
    | {
        ignorePath: string;
      };
  ignores?: string[];
}) => ReturnType<ConfigFn>;

export const ignores: IgnoresConfig = async (options) => {
  const { enableGitignore = true, ignores = [] } = options;

  let _ignoreList: string[] = [];

  if (enableGitignore) {
    let ignorePath = ".gitignore";

    if (typeof enableGitignore !== "boolean") {
      ignorePath = enableGitignore.ignorePath;
    }

    // eslint-disable-next-line n/prefer-global/process
    const gitignorePath = path.join(process.cwd(), ignorePath);

    if (fs.existsSync(gitignorePath)) {
      _ignoreList = splitPattern(fs.readFileSync(gitignorePath).toString())
        .filter((i) => !(i.startsWith("#") || i.length === 0))
        .map((i) => (i.startsWith("/") ? i.slice(1) : i));
    }
  }

  return [
    {
      ignores: [...GLOB_EXCLUDE, ..._ignoreList, ...ignores],
    },
  ];
};
