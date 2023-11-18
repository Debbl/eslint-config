import type { ConfigItem } from "../types";
import { pluginTailwindcss } from "../plugins";

export async function tailwindcss(): Promise<ConfigItem[]> {
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
