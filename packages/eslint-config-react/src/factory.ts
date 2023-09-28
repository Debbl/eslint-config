import type { FlatESLintConfigItem } from "eslint-define-config";
import { ts, tsWithLanguageServer } from "@debbl/eslint-config-ts";
import { basic, combine } from "@debbl/eslint-config-basic";
import { react as _react } from "./configs";
import type { OptionsConfigReact } from "./types";

export function react(
  options: OptionsConfigReact = {},
  ...userConfigs: (FlatESLintConfigItem | FlatESLintConfigItem[])[]
) {
  const enableTypeScript = options.ts ?? true;

  const configs = [];

  if (enableTypeScript) {
    configs.push(ts(options));

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

  configs.push(_react);

  return combine(...configs, ...userConfigs);
}
