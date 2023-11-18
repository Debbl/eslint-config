import type { ConfigItem } from "../types";
import { interopDefault } from "../utils";

export async function tailwindcss(): Promise<ConfigItem[]> {
  const pluginTailwindcss = await interopDefault(
    // @ts-expect-error missing types
    import("eslint-plugin-tailwindcss"),
  );
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
