import process from "node:process";
import type { FlatESLintConfigItem } from "eslint-define-config";
import {
  basic,
  comments,
  ignores,
  imports,
  js,
  jsdoc,
  node,
  unicorn,
} from "@debbl/eslint-config-basic";
import { ts, tsWithLanguageServer } from "@debbl/eslint-config-ts";
import { vue } from "@debbl/eslint-config-vue";
import { react } from "@debbl/eslint-config-react";
import { solid } from "@debbl/eslint-config-solid";
import { tailwindcss } from "@debbl/eslint-config-tailwindcss";
import { prettier } from "@debbl/eslint-config-prettier";
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

  const enableVue = options.vue;
  const enableReact = options.react;
  const enableSolid = options.solid;
  const enableTailwindcss = options.tailwindcss;
  const enableTypeScript = options.ts;
  const enablePrettier = options.prettier ?? true;

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
  enableVue && componentExts.push("vue");

  if (enableReact) configs.push(react(options));
  else if (enableVue) configs.push(vue(options));
  else if (enableSolid) configs.push(solid(options));
  else if (enableTypeScript) {
    configs.push(ts({ ...options, componentExts }));
    if (typeof enableTypeScript !== "boolean") {
      configs.push(
        tsWithLanguageServer({
          ...enableTypeScript,
          componentExts,
        }),
      );
    }
  } else {
    configs.push(basic(options));
  }

  enableTailwindcss && configs.push(tailwindcss());
  enablePrettier && configs.push(prettier());

  return combine(...configs, ...userConfigs);
}
