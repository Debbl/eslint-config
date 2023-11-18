import { join, resolve } from "node:path";
import { afterAll, beforeAll, it } from "vitest";
import diff from "fast-diff";
import fs from "fs-extra";
import { execa } from "execa";
import fg from "fast-glob";
import type { OptionsConfig } from "../src/types";

beforeAll(async () => {
  await fs.rm("_fixtures", { recursive: true, force: true });
});
afterAll(async () => {
  await fs.rm("_fixtures", { recursive: true, force: true });
});

runWithConfig("js", {
  typescript: false,
  vue: false,
  customConfig: {
    rules: {
      "prettier/prettier": "error",
    },
  },
});
runWithConfig("all", {
  typescript: true,
  vue: true,
  customConfig: {
    rules: {
      "prettier/prettier": "error",
    },
  },
});
runWithConfig("no-style", {
  typescript: true,
  vue: true,
  prettier: false,
});
runWithConfig("tab-single-quotes-no-semi", {
  typescript: true,
  vue: true,
  prettier: {
    semi: false,
    useTabs: true,
    singleQuote: true,
  },
  customConfig: {
    rules: {
      "prettier/prettier": "error",
    },
  },
});

runWithConfig("ts-override", {
  typescript: true,
  customConfig: {
    rules: {
      "prettier/prettier": "error",

      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
  },
});

runWithConfig("hooks", {
  react: true,
  customConfig: {
    rules: {
      "prettier/prettier": "error",

      "react/prop-types": "off",
      "react/no-unknown-property": "off",
      "react/no-unescaped-entities": "off",
    },
  },
});

function runWithConfig(name: string, configs: OptionsConfig) {
  it.concurrent(
    name,
    async ({ expect }) => {
      const from = resolve("fixtures/input");
      const output = resolve("fixtures/output", name);
      const target = resolve("_fixtures", name);

      await fs.copy(from, target, {
        filter: (src) => {
          return !src.includes("node_modules");
        },
      });
      await fs.writeFile(
        join(target, "eslint.config.js"),
        `
// @eslint-disable
import config from '@debbl/eslint-config'

export default config(
  ${JSON.stringify(configs)},
)
  `,
      );

      const execaChildProcess = await execa("npx", ["eslint", ".", "--fix"], {
        cwd: target,
        stdio: "pipe",
      });

      if (name === "hooks") {
        expect(execaChildProcess.stdout.split("\n")[2].trim()).toBe(
          "9:6  warning  React Hook useEffect has a missing dependency: 'count'. Either include it or remove the dependency array  react-hooks/exhaustive-deps",
        );
      }

      const files = await fg("**/*", {
        ignore: ["node_modules", "eslint.config.js"],
        cwd: target,
      });

      await Promise.all(
        files.map(async (file) => {
          let content = await fs.readFile(join(target, file), "utf-8");
          const source = await fs.readFile(join(from, file), "utf-8");
          if (
            name === "ts-override" &&
            (file === "hooks.jsx" || file === "vue.vue")
          ) {
            // eslint-disable-next-line no-console
            console.log(diff(source, content));
            // eslint-disable-next-line no-console
            console.log("---------------->", content === source);
          }

          if (content === source) {
            content = `// unchanged\n${content}`;
            // eslint-disable-next-line no-console
            console.log(file, name);
          }
          await expect.soft(content).toMatchFileSnapshot(join(output, file));
        }),
      );
    },
    30_000,
  );
}
