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
  files?: ((files: string[]) => string[]) | string[];
}) => ReturnType<ConfigFn>;

export const ignores: IgnoresConfig = async (options) => {
  const { enableGitignore = true, files = [] } = options;

  let gitIgnores: string[] = [];

  if (enableGitignore) {
    let ignorePath = ".gitignore";

    if (typeof enableGitignore !== "boolean") {
      ignorePath = enableGitignore.ignorePath;
    }

    // eslint-disable-next-line n/prefer-global/process
    const gitignorePath = path.join(process.cwd(), ignorePath);

    if (fs.existsSync(gitignorePath)) {
      gitIgnores = splitPattern(fs.readFileSync(gitignorePath).toString())
        .filter((i) => !(i.startsWith("#") || i.length === 0))
        .map((i) => (i.startsWith("/") ? i.slice(1) : i));
    }
  }

  let ignores = [...GLOB_EXCLUDE, ...gitIgnores];

  if (typeof files === "function") {
    ignores = files(ignores);
  } else {
    ignores = [...ignores, ...files];
  }

  return [
    {
      ignores: [...GLOB_EXCLUDE, ...ignores],
    },
  ];
};
