import process from "node:process";
import type { FlatESLintConfigItem } from "eslint-define-config";
import type { OptionsConfigBasic } from "./share";
import { combine } from "./share";
import {
  comments,
  ignores,
  imports,
  js,
  jsdoc,
  jsonc,
  markdown,
  node,
  sortPackageJson,
  sortTsconfig,
  test,
  unicorn,
  yml,
} from "./configs";

export function basic(
  options: OptionsConfigBasic = {},
  ...userConfigs: (FlatESLintConfigItem | FlatESLintConfigItem[])[]
) {
  const isInEditor =
    options.isInEditor ??
    !!(
      (process.env.VSCODE_PID || process.env.JETBRAINS_IDE) &&
      !process.env.CI
    );

  const configs = [
    ignores,
    js({ isInEditor }),
    comments,
    node,
    jsdoc,
    imports,
    unicorn,
  ];

  if (options.test ?? true) configs.push(test({ isInEditor }));

  if (options.jsonc ?? true) {
    configs.push(jsonc, sortPackageJson, sortTsconfig);
  }

  if (options.yaml ?? true) configs.push(yml);

  if (options.markdown ?? true)
    configs.push(markdown({ componentExts: options.componentExts }));

  return combine(...configs, ...userConfigs);
}
