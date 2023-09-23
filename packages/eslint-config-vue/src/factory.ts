import { FlatESLintConfigItem } from "eslint-define-config";
import { basic } from "@debbl/eslint-config-basic";
import { isPackageExists } from "local-pkg";
import { combine } from "./share";
import { vue as _vue } from "./configs";

export function vue(
  options: {
    componentExts?: string[];
    isInEditor?: boolean;
    test?: boolean;
    jsonc?: boolean;
    yml?: boolean;
    markdown?: boolean;
    ts?: boolean;
  },
  ...userConfigs: (FlatESLintConfigItem | FlatESLintConfigItem[])[]
) {
  const enableTypeScript = options.ts ?? isPackageExists("typescript");

  return combine(
    basic(options),
    _vue({ typescript: enableTypeScript }),
    ...userConfigs
  );
}
