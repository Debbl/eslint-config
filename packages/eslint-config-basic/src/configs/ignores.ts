import fs from "node:fs";
import path from "node:path";
import type { FlatESLintConfigItem } from "eslint-define-config";
import { GLOB_EXCLUDE } from "../share";

const REGEX_SPLIT_ALL_CRLF = /\r?\n/g;
const splitPattern = (pattern: string) => pattern.split(REGEX_SPLIT_ALL_CRLF);

export const ignores = (
  ignorePath: string = ".gitignore",
): FlatESLintConfigItem[] => {
  // eslint-disable-next-line node/prefer-global/process
  const gitignorePath = path.join(process.cwd(), ignorePath);

  let ignoreList: string[] = [];
  if (fs.existsSync(gitignorePath)) {
    ignoreList = splitPattern(fs.readFileSync(gitignorePath).toString()).filter(
      (i) => !(i.startsWith("#") || i.length === 0),
    );
  }

  return [{ ignores: [...GLOB_EXCLUDE, ...ignoreList] }];
};
