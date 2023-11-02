import type { ConfigItem } from "../types";
import { pluginTailwindcss } from "../plugins";

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
