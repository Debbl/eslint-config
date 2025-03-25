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
} from "~/configs";
import { react } from "~/configs/react";
import { tailwindcss } from "~/configs/tailwindcss";
import { combine, getConfigOptions } from "~/utils";
import type { Awaitable, ConfigItem, OptionsConfig } from "~/types";

/**
 * Construct an array of ESLint flat config items.
 */
export function defineConfig(
  options: OptionsConfig = {},
  ...userConfigs: ConfigItem[]
) {
  const {
    ignores: enableIgnores = true,
    vue: enableVue,
    react: enableReact,
    solid: enableSolid,
    typescript: enableTypeScript,
    tailwindcss: enableTailwindcss,
    componentExts = [],
  } = options;

  const configs: Awaitable<ConfigItem | ConfigItem[]>[] = [];

  // Base configs
  configs.push(
    ignores(getConfigOptions(enableIgnores)),
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
    configs.push(test(getConfigOptions(options.test)));
  }

  if (enableVue) {
    configs.push(
      vue({
        ...getConfigOptions(options.vue),
        typescript: !!enableTypeScript,
      }),
    );
  }

  if (enableReact) {
    configs.push(react(getConfigOptions(enableReact)));
  }

  if (options.jsonc ?? true) {
    configs.push(
      jsonc(getConfigOptions(options.jsonc)),
      sortPackageJson(),
      sortTsconfig(),
    );
  }

  if (options.yml ?? true) {
    configs.push(yml(getConfigOptions(options.yml)));
  }

  if (options.toml ?? true) {
    configs.push(toml(getConfigOptions(options.toml)));
  }

  if (options.markdown ?? true) {
    configs.push(
      markdown({
        ...getConfigOptions(options.markdown),
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
        ...getConfigOptions(options.prettier),
        tailwindcss: enableTailwindcss === "prettier",
      }),
    );
  }

  const merged = combine(...configs, ...userConfigs);

  return merged;
}
