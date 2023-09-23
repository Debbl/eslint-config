import type { FlatESLintConfigItem } from "eslint-define-config";
import { basic } from "@debbl/eslint-config-basic";
import { isPackageExists } from "local-pkg";
import type { OptionsConfigBasic} from "./share";
import { combine } from "./share";
import { vue as _vue } from "./configs";

export function vue(
  options:  OptionsConfigBasic = {},
  ...userConfigs: (FlatESLintConfigItem | FlatESLintConfigItem[])[]
) {
  const enableTypeScript = options.ts ?? isPackageExists("typescript");

  return combine(
    basic(options),
    _vue({ ts: enableTypeScript }),
    ...userConfigs
  );
}
