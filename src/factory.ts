import process from "node:process";
import fs from "node:fs";
import { isPackageExists } from "local-pkg";
import gitignore from "eslint-config-flat-gitignore";
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
  yaml,
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

const VuePackages = ["vue", "nuxt", "vitepress", "@slidev/cli"];

/**
 * Construct an array of ESLint flat config items.
 */
export function config(
  options: OptionsConfig & ConfigItem = {},
  ...userConfigs: (ConfigItem | ConfigItem[])[]
) {
  const {
    isInEditor = !!(
      (process.env.VSCODE_PID || process.env.JETBRAINS_IDE) &&
      !process.env.CI
    ),
    vue: enableVue = VuePackages.some((i) => isPackageExists(i)),
    react: enableReact = isPackageExists("react"),
    typescript: enableTypeScript = isPackageExists("typescript"),
    gitignore: enableGitignore = true,
    stylistic: enableStylistic = true,
    overrides = {},
    componentExts = [],
  } = options;

  const configs: ConfigItem[][] = [];

  if (enableGitignore) {
    if (typeof enableGitignore !== "boolean") {
      configs.push([gitignore(enableGitignore)]);
    } else {
      if (fs.existsSync(".gitignore")) configs.push([gitignore()]);
    }
  }

  // Base configs
  configs.push(
    ignores(),
    javascript({
      isInEditor,
      overrides: overrides.javascript,
    }),
    comments(),
    node(),
    jsdoc({ stylistic: enableStylistic }),
    imports({ stylistic: enableStylistic }),
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
        overrides: overrides.typescript,
      }),
    );
  }

  if (options.test ?? true) {
    configs.push(
      test({
        isInEditor,
        overrides: overrides.test,
      }),
    );
  }

  if (enableVue) {
    configs.push(
      vue({
        overrides: overrides.vue,
        typescript: !!enableTypeScript,
      }),
    );
  }

  if (enableReact) {
    configs.push(
      react({
        overrides: overrides.react,
      }),
    );
  }

  if (options.jsonc ?? true) {
    configs.push(
      jsonc({
        overrides: overrides.jsonc,
        stylistic: enableStylistic,
      }),
      sortPackageJson(),
      sortTsconfig(),
    );
  }

  if (options.yaml ?? true) {
    configs.push(
      yaml({
        overrides: overrides.yaml,
        stylistic: enableStylistic,
      }),
    );
  }

  if (options.markdown ?? true) {
    configs.push(
      markdown({
        componentExts,
        overrides: overrides.markdown,
      }),
    );
  }

  if (options.prettier ?? true) {
    configs.push(
      prettier({
        overrides: overrides.prettier,
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
