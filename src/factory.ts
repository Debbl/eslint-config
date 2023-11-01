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

/**
 * Construct an array of ESLint flat config items.
 */
export function config(options: OptionsConfig = {}) {
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

  const merged = combine(...configs, options.customConfig ?? []);

  return merged;
}
