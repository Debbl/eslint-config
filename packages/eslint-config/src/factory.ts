import process from "node:process";
import type { FlatESLintConfigItem } from "eslint-define-config";
import { isPackageExists } from "local-pkg";
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
} from "@debbl/eslint-config-basic";
import { ts, tsWithLanguageServer } from "@debbl/eslint-config-ts";
import { vue } from "@debbl/eslint-config-vue";
import { react } from "@debbl/eslint-config-react";
import { solid } from "@debbl/eslint-config-solid";
import { tailwindcss } from "@debbl/eslint-config-tailwindcss";
import type { OptionsConfig } from "./share";
import { combine } from "./share";

/**
 * Construct an array of ESLint flat config items.
 */
export function config(
  options: OptionsConfig = {},
  ...userConfigs: (FlatESLintConfigItem | FlatESLintConfigItem[])[]
) {
  const isInEditor =
    options.isInEditor ??
    !!(
      (process.env.VSCODE_PID || process.env.JETBRAINS_IDE) &&
      !process.env.CI
    );
  const enableVue =
    options.vue ??
    (isPackageExists("vue") ||
      isPackageExists("nuxt") ||
      isPackageExists("vitepress") ||
      isPackageExists("@slidev/cli"));
  const enableReact = options.react ?? isPackageExists("react");
  const enableSolid = options.solid ?? isPackageExists("solid-js");
  const enableTailwindcss =
    options.tailwindcss ?? isPackageExists("tailwindcss");
  const enableTypeScript = options.ts ?? isPackageExists("typescript");

  const configs = [
    ignores,
    js({ isInEditor }),
    comments,
    node,
    jsdoc,
    imports,
    unicorn,
  ];

  // In the future we may support more component extensions like Svelte or so
  const componentExts: string[] = [];
  if (enableVue) componentExts.push("vue");
  if (enableReact) componentExts.push("react");
  if (enableSolid) componentExts.push("solid");
  if (enableTailwindcss) componentExts.push("tailwindcss");

  if (enableTypeScript) {
    configs.push(ts({ componentExts }));

    if (typeof enableTypeScript !== "boolean") {
      configs.push(
        tsWithLanguageServer({
          ...enableTypeScript,
          componentExts,
        })
      );
    }
  }

  if (options.test ?? true) configs.push(test({ isInEditor }));

  if (enableVue) configs.push(vue({ ts: !!enableTypeScript }));
  if (enableReact) configs.push(react());
  if (enableSolid) configs.push(solid());
  if (enableTailwindcss) configs.push(tailwindcss());

  if (options.jsonc ?? true) {
    configs.push(jsonc, sortPackageJson, sortTsconfig);
  }

  if (options.yaml ?? true) configs.push(yml);

  if (options.markdown ?? true) configs.push(markdown({ componentExts }));

  return combine(...configs, ...userConfigs);
}
