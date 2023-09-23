import { FlatESLintConfigItem } from "eslint-define-config";
import { combine } from "./share";
import { tailwindcss as _tailwindcss } from "./configs";

export function tailwindcss(
  ...userConfigs: (FlatESLintConfigItem | FlatESLintConfigItem[])[]
) {
  return combine(_tailwindcss, ...userConfigs);
}
