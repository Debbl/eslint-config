import type { ConfigItem, OptionsConfig } from "./types";
import {
  comments,
  ignores,
  imports,
  javascript,
  jsdoc,
  jsonc,
  markdown,
  node,
  perfectionist,
  prettier,
  sortPackageJson,
  sortTsconfig,
  test,
  toml,
  unicorn,
  yml,
} from "./configs";
import { combine } from "./utils";

function getConfigOption<T>(options: T) {
  return options || {};
}

/**
 * Construct an array of ESLint flat config items.
 */
export function config(options: OptionsConfig = {}) {
  const { ignores: enableGitignore = true, componentExts = [] } = options;

  const configs: ConfigItem[][] = [];

  // Base configs
  configs.push(
    ignores(getConfigOption(enableGitignore)),
    javascript(options.javascript ?? {}),
    comments(),
    node(),
    jsdoc(),
    imports(),
    unicorn(),

    perfectionist(),

    test(getConfigOption(options.test)),
    // jsonc
    jsonc(getConfigOption(options.jsonc)),
    sortPackageJson(),
    sortTsconfig(),

    yml(getConfigOption(options.yml)),
    toml(getConfigOption(options.toml)),
    markdown({
      ...getConfigOption(options.markdown),
      componentExts,
    }),
  );

  if (options.presets) configs.push(...options.presets);

  configs.push(prettier(getConfigOption(options.prettier)));

  const merged = combine(...configs, options.customConfig ?? []);

  return merged;
}

export function plainConfig(...args: Parameters<typeof combine>) {
  return combine(...args);
}
