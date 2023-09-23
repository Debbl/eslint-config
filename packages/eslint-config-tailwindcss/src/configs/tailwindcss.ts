import { type FlatESLintConfigItem } from "eslint-define-config";
import { pluginTailwindcss } from "../plugins";

export const tailwindcss: FlatESLintConfigItem[] = [
  {
    plugins: {
      tailwindcss: pluginTailwindcss,
    },
    languageOptions: {
      parserOptions: {
        ...pluginTailwindcss.configs.recommended.parserOptions,
      },
    },
    rules: {
      ...pluginTailwindcss.configs.recommended.rules,
    },
  },
];
