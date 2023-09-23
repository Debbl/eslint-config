import { FlatESLintConfigItem } from "eslint-define-config";
import { combine } from "./share";
import { prettier as _prettier } from "./configs";

export function prettier(
  ...userConfigs: (FlatESLintConfigItem | FlatESLintConfigItem[])[]
) {
  return combine(_prettier, ...userConfigs);
}
