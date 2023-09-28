import type { FlatESLintConfigItem } from "eslint-define-config";
import { basic } from "@debbl/eslint-config-basic";
import ts from "@debbl/eslint-config-ts";
import type { OptionsConfigBasic } from "./share";
import { combine } from "./share";
import { vue as _vue } from "./configs";

export function vue(
  options: OptionsConfigBasic = {},
  ...userConfigs: (FlatESLintConfigItem | FlatESLintConfigItem[])[]
) {
  const enableTypeScript = options.ts ?? true;

  const configs = [];

  const componentExts: string[] = [];
  componentExts.push("vue");

  options.componentExts = componentExts;

  if (enableTypeScript) {
    configs.push(ts(options));
  } else {
    configs.push(basic(options));
  }

  configs.push(
    _vue({ ts: enableTypeScript, overrides: options.overrides?.vue }),
  );

  return combine(...configs, ...userConfigs);
}
