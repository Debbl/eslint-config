import type { FlatESLintConfigItem } from "eslint-define-config";
import { basic } from "@debbl/eslint-config-basic";
import { ts as _ts, tsWithLanguageServer } from "./configs";
import type { OptionsConfigTs } from "./types";

export function ts(
  options: OptionsConfigTs = {},
  ...userConfigs: (FlatESLintConfigItem | FlatESLintConfigItem[])[]
) {
  const enableTypeScript = options.ts ?? true;

  const configs = [];

  if (enableTypeScript) {
    configs.push(
      _ts({
        componentExts: options.componentExts,
        overrides: options.overrides?.ts,
      }),
    );

    if (typeof enableTypeScript !== "boolean") {
      configs.push(
        tsWithLanguageServer({
          ...enableTypeScript,
          componentExts: options.componentExts,
        }),
      );
    }
  }

  return basic(options, ...configs, ...userConfigs);
}
