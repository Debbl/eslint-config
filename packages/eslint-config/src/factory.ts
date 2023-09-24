import type { FlatESLintConfigItem } from "eslint-define-config";
import { basic } from "@debbl/eslint-config-basic";
import { ts } from "@debbl/eslint-config-ts";
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
  const enableVue = options.vue;
  const enableReact = options.react;
  const enableSolid = options.solid;
  const enableTailwindcss = options.tailwindcss;
  const enableTypeScript = options.ts ?? true;
  const enablePrettier = options.prettier ?? true;

  const configs = [];

  if (enableReact) configs.push(react(options));
  else if (enableVue) configs.push(vue(options));
  else if (enableSolid) configs.push(solid(options));
  else if (enableTypeScript) configs.push(ts({ ...options }));
  else configs.push(basic(options));

  enableTailwindcss && configs.push(tailwindcss());
  enablePrettier && configs.push(prettier());

  return combine(...configs, ...userConfigs);
}
