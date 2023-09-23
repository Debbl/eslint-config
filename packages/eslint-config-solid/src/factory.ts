import type { FlatESLintConfigItem } from "eslint-define-config";
import { ts } from "@debbl/eslint-config-ts";
import type { OptionsConfigBasic} from "./share";
import { combine } from "./share";
import { solid as _solid } from "./configs";

export function solid(
  options: OptionsConfigBasic = {},
  ...userConfigs: (FlatESLintConfigItem | FlatESLintConfigItem[])[]
) {
  return combine(ts(options), _solid, ...userConfigs);
}
