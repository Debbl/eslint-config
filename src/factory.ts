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
  prettier,
  sortKeys,
  sortPackageJson,
  sortTsconfig,
  test,
  typescript,
  unicorn,
  vue,
  yml,
} from "./configs";
import { combine } from "./utils";
import { react } from "./configs/react";

const flatConfigProps: (keyof ConfigItem)[] = [
  "files",
  "ignores",
  "languageOptions",
  "linterOptions",
  "processor",
  "plugins",
  "rules",
  "settings",
];

/**
 * Construct an array of ESLint flat config items.
 */
export function config(
  options: OptionsConfig & ConfigItem = {},
  ...userConfigs: (ConfigItem | ConfigItem[])[]
) {
  const {
    vue: enableVue,
    react: enableReact,
    typescript: enableTypeScript,
    gitignore: enableGitignore = true,
    componentExts = [],
  } = options;

  const configs: ConfigItem[][] = [];

  // Base configs
  configs.push(
    ignores({
      enableGitignore,
    }),
    javascript(),
    comments(),
    node(),
    jsdoc(),
    imports(),
    unicorn(),

    // Optional plugins (not enabled by default)
    sortKeys(),
  );

  if (enableVue) componentExts.push("vue");

  if (enableTypeScript) {
    configs.push(
      typescript({
        ...(typeof enableTypeScript !== "boolean" ? enableTypeScript : {}),
        componentExts,
      }),
    );
  }

  if (options.test ?? true) {
    configs.push(test());
  }

  if (enableVue) {
    configs.push(
      vue({
        typescript: !!enableTypeScript,
      }),
    );
  }

  if (enableReact) {
    configs.push(react());
  }

  if (options.jsonc ?? true) {
    configs.push(jsonc(), sortPackageJson(), sortTsconfig());
  }

  if (options.yml ?? true) {
    configs.push(yml());
  }

  if (options.markdown ?? true) {
    configs.push(
      markdown({
        componentExts,
      }),
    );
  }

  if (options.prettier ?? true) {
    configs.push(
      prettier({
        ...(typeof options.prettier !== "boolean" ? options.prettier : {}),
      }),
    );
  }

  // User can optionally pass a flat config item to the first argument
  // We pick the known keys as ESLint would do schema validation
  const fusedConfig = flatConfigProps.reduce((acc, key) => {
    if (key in options) acc[key] = options[key] as any;
    return acc;
  }, {} as ConfigItem);
  if (Object.keys(fusedConfig).length) configs.push([fusedConfig]);

  const merged = combine(...configs, ...userConfigs);

  return merged;
}
