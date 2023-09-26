import type { FlatESLintConfigItem } from "eslint-define-config";
import { basic } from "@debbl/eslint-config-basic";
import ts, { tsWithLanguageServer } from "@debbl/eslint-config-ts";
import type { OptionsConfigBasic } from "dist";
import type { OptionsConfig } from "./share";
import { combine } from "./share";
import { vue as _vue } from "./configs";

export function vue(
  options: OptionsConfig = {},
  ...userConfigs: (FlatESLintConfigItem | FlatESLintConfigItem[])[]
) {
  const enableTypeScript = options.ts ?? true;

  const configs = [];

  const componentExts: string[] = [];
  componentExts.push("vue");

  (options as OptionsConfigBasic).componentExts = componentExts;

  if (enableTypeScript) {
    configs.push(ts(options));
  } else {
    configs.push(basic(options));
  }

  configs.push(_vue({ ts: enableTypeScript }));

  return combine(...configs, ...userConfigs);
}
