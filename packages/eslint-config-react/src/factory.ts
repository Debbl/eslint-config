import { FlatESLintConfigItem } from "eslint-define-config";
import { ts } from "@debbl/eslint-config-ts";
import { combine } from "./share";
import { react as _react } from "./configs";

export function react(
  options: {
    componentExts: string[];
    isInEditor?: boolean;
    test: boolean;
    jsonc: boolean;
    yml: boolean;
    markdown: boolean;
  } = {
    componentExts: [],
    test: true,
    jsonc: true,
    yml: true,
    markdown: true,
  },
  ...userConfigs: (FlatESLintConfigItem | FlatESLintConfigItem[])[]
) {
  return combine(ts(options), _react, ...userConfigs);
}
