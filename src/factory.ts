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
  typescript,
  unicorn,
  vue,
  yml,
} from "./configs";
import { react } from "./configs/react";
import { tailwindcss } from "./configs/tailwindcss";
import { combine } from "./utils";
import type { Awaitable, ConfigItem, OptionsConfig } from "./types";

function getConfigOption<T>(options: T) {
  return options ? (typeof options !== "boolean" ? options : {}) : {};
}

/**
 * Construct an array of ESLint flat config items.
 */
export function defineConfig(options: OptionsConfig = {}) {
  const {
    ignores: enableGitignore = true,
    vue: enableVue,
    react: enableReact,
    solid: enableSolid,
    typescript: enableTypeScript,
    tailwindcss: enableTailwindcss,
    componentExts = [],
  } = options;

  const configs: Awaitable<ConfigItem[]>[] = [];

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
  );

  if (enableVue) componentExts.push("vue");

  if (enableTypeScript) {
    configs.push(
      typescript({
        ...(typeof enableTypeScript !== "boolean" ? enableTypeScript : {}),
        enableSolid,
        componentExts,
      }),
    );
  }

  if (options.test ?? true) {
    configs.push(test(getConfigOption(options.test)));
  }

  if (enableVue) {
    configs.push(
      vue({
        ...getConfigOption(options.vue),
        typescript: !!enableTypeScript,
      }),
    );
  }

  if (enableReact) {
    configs.push(react(getConfigOption(enableReact)));
  }

  if (options.jsonc ?? true) {
    configs.push(
      jsonc(getConfigOption(options.jsonc)),
      sortPackageJson(),
      sortTsconfig(),
    );
  }

  if (options.yml ?? true) {
    configs.push(yml(getConfigOption(options.yml)));
  }

  if (options.toml ?? true) {
    configs.push(toml(getConfigOption(options.toml)));
  }

  if (options.markdown ?? true) {
    configs.push(
      markdown({
        ...getConfigOption(options.markdown),
        componentExts,
      }),
    );
  }

  if (typeof enableTailwindcss === "boolean" && enableTailwindcss) {
    configs.push(tailwindcss());
  }

  if (options.prettier ?? true) {
    configs.push(
      prettier({
        ...getConfigOption(options.prettier),
        tailwindcss: enableTailwindcss === "prettier",
      }),
    );
  }

  const merged = combine(...configs, options.customConfig ?? []);

  return merged;
}

/**
 * @deprecated Use `defineConfig` instead.
 */
export const config = defineConfig;
