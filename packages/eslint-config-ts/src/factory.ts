import type { FlatESLintConfigItem } from "eslint-define-config";
import { basic } from "@debbl/eslint-config-basic";
import type { OptionsConfigBasic } from "./share";
import { combine } from "./share";
import { ts as _ts, tsWithLanguageServer } from "./configs";

export function ts(
  options: OptionsConfigBasic = {},
  ...userConfigs: (FlatESLintConfigItem | FlatESLintConfigItem[])[]
) {
  const enableTypeScript = options.ts ?? true;

  const configs = [basic(options)];

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

  return combine(...configs, ...userConfigs);
}
