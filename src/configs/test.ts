import type { ConfigItem } from "../types";
import { pluginNoOnlyTests, pluginVitest } from "../plugins";
import { GLOB_TESTS } from "../globs";

export function test(): ConfigItem[] {
  return [
    {
      name: "eslint:test:setup",
      plugins: {
        test: {
          ...pluginVitest,
          rules: {
            ...pluginVitest.rules,
            // extend `test/no-only-tests` rule
            ...pluginNoOnlyTests.rules,
          },
        },
      },
    },
    {
      files: GLOB_TESTS,
      name: "eslint:test:rules",
      rules: {
        "test/consistent-test-it": [
          "error",
          { fn: "it", withinDescribe: "it" },
        ],
        "test/no-identical-title": "error",
        "test/no-only-tests": "error",
        "test/prefer-hooks-in-order": "error",
        "test/prefer-lowercase-title": "error",
      },
    },
  ];
}
