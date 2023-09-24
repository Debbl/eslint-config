import type { FlatESLintConfigItem } from "eslint-define-config";
import { basic } from "@debbl/eslint-config-basic";
import ts, { tsWithLanguageServer } from "@debbl/eslint-config-ts";
import type { OptionsConfig, OptionsConfigBasic } from "./share";
import { combine } from "./share";
import { vue as _vue } from "./configs";

export function vue(
  options: OptionsConfig = {},
  ...userConfigs: (FlatESLintConfigItem | FlatESLintConfigItem[])[]
) {
  const enableTypeScript = options.ts ?? true;
  const enableVue = options.vue;

  const configs = [];

  const componentExts: string[] = [];
  enableVue && componentExts.push("vue");

  if (enableTypeScript) {
    configs.push(ts({ ...options, componentExts }));

    if (typeof enableTypeScript !== "boolean") {
      configs.push(
        tsWithLanguageServer({
          ...enableTypeScript,
          componentExts,
        }),
      );
    }
  }
  configs.push(_vue({ ts: enableTypeScript }));

  return combine(...configs, ...userConfigs);
}
