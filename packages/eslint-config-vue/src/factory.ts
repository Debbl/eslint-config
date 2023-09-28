import type { FlatESLintConfigItem } from "eslint-define-config";
import { basic, combine } from "@debbl/eslint-config-basic";
import ts from "@debbl/eslint-config-ts";
import { vue as _vue } from "./configs";
import type { OptionsConfigVue } from "./types";

export function vue(
  options: OptionsConfigVue = {},
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
    _vue({ ts: !!enableTypeScript, overrides: options.overrides?.vue }),
  );

  return combine(...configs, ...userConfigs);
}
