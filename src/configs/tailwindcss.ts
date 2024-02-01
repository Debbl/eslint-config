import pluginTailwindcss from "eslint-plugin-tailwindcss";
import type { ConfigItem } from "../types";

// @ts-expect-error missing types

export function tailwindcss(): ConfigItem[] {
  return [
    {
      name: "eslint:tailwindcss",
      plugins: {
        tailwindcss: pluginTailwindcss,
      },
      rules: {
        ...pluginTailwindcss.configs.recommended.rules,
      },
    },
  ];
}
