import type { FlatESLintConfigItem } from "eslint-define-config";
import { ts, tsWithLanguageServer } from "@debbl/eslint-config-ts";
import { basic } from "@debbl/eslint-config-basic";
import type { OptionsConfigBasic } from "./share";
import { combine } from "./share";
import { solid as _solid } from "./configs";

export function solid(
  options: OptionsConfigBasic = {},
  ...userConfigs: (FlatESLintConfigItem | FlatESLintConfigItem[])[]
) {
  const enableTypeScript = options.ts ?? true;

  const configs = [];

  if (enableTypeScript) {
    configs.push(ts({ ...options }));

    if (typeof enableTypeScript !== "boolean") {
      configs.push(
        tsWithLanguageServer({
          ...enableTypeScript,
        }),
      );
    }
  } else {
    configs.push(basic(options));
  }

  configs.push(_solid({ ts: !!enableTypeScript }));

  return combine(...configs, ...userConfigs);
}
