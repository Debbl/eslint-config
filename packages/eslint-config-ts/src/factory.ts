import type { FlatESLintConfigItem } from "eslint-define-config";
import { basic } from "@debbl/eslint-config-basic";
import type { OptionsConfigBasic } from "./share";
import { combine } from "./share";
import { ts as _ts } from "./configs";

export function ts(
  options: OptionsConfigBasic = {},
  ...userConfigs: (FlatESLintConfigItem | FlatESLintConfigItem[])[]
) {
  return combine(
    basic(options),
    _ts({ componentExts: options.componentExts }),
    ...userConfigs,
  );
}
