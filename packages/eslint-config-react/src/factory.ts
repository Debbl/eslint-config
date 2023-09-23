import type { FlatESLintConfigItem } from "eslint-define-config";
import { ts } from "@debbl/eslint-config-ts";
import type { OptionsConfigBasic } from "./share";
import { combine } from "./share";
import { react as _react } from "./configs";

export function react(
  options: OptionsConfigBasic = {},
  ...userConfigs: (FlatESLintConfigItem | FlatESLintConfigItem[])[]
) {
  const enableTypeScript = options.ts ?? true;
  const configs = [];

  if (enableTypeScript) configs.push(ts(options));
  configs.push(_react);

  return combine(...configs, ...userConfigs);
}
