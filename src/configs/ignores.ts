import fs from "node:fs";
import path from "node:path";
import { GLOB_EXCLUDE } from "../globs";
import type { ConfigItem } from "../types";

const REGEX_SPLIT_ALL_CRLF = /\r?\n/g;
const splitPattern = (pattern: string) => pattern.split(REGEX_SPLIT_ALL_CRLF);

export function ignores(options: {
  enableGitignore:
    | boolean
    | {
        ignorePath: string;
      };
}): ConfigItem[] {
  const { enableGitignore } = options;

  if (enableGitignore) {
    let ignorePath = ".gitignore";

    if (typeof enableGitignore !== "boolean") {
      ignorePath = enableGitignore.ignorePath;
    }

    // eslint-disable-next-line node/prefer-global/process
    const gitignorePath = path.join(process.cwd(), ignorePath);
    let ignoreList: string[] = [];

    if (fs.existsSync(gitignorePath)) {
      ignoreList = splitPattern(fs.readFileSync(gitignorePath).toString())
        .filter((i) => !(i.startsWith("#") || i.length === 0))
        .map((i) => (i.startsWith("/") ? i.slice(1) : i));

      return [
        {
          ignores: ignoreList,
        },
      ];
    }
  }

  return [
    {
      ignores: GLOB_EXCLUDE,
    },
  ];
}
