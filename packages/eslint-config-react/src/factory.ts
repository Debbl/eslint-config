import type { FlatESLintConfigItem } from "eslint-define-config";
import { ts } from "@debbl/eslint-config-ts";
import type { OptionsConfigBasic} from "./share";
import { combine } from "./share";
import { react as _react } from "./configs";

export function react(
  options: OptionsConfigBasic = {},
  ...userConfigs: (FlatESLintConfigItem | FlatESLintConfigItem[])[]
) {
  return combine(ts(options), _react, ...userConfigs);
}
