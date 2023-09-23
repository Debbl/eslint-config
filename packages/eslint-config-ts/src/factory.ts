import { FlatESLintConfigItem } from "eslint-define-config";
import { basic } from "@debbl/eslint-config-basic";
import { combine } from "./share";
import { ts as _ts } from "./configs";

export function ts(
  options: {
    componentExts?: string[];
    isInEditor?: boolean;
    test?: boolean;
    jsonc?: boolean;
    yml?: boolean;
    markdown?: boolean;
  },
  ...userConfigs: (FlatESLintConfigItem | FlatESLintConfigItem[])[]
) {
  return combine(basic(options), _ts(options), ...userConfigs);
}
