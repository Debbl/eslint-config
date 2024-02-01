import pluginVitest from "eslint-plugin-vitest";
import pluginNoOnlyTests from "eslint-plugin-no-only-tests";
import type { ConfigFn } from "../types";
import { GLOB_TESTS } from "../globs";

// @ts-expect-error missing types

export type TestConfig = ConfigFn;

export const test: TestConfig = (options) => {
  const { overrides = {} } = options;

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
      name: "eslint:test:rules",
      files: GLOB_TESTS,
      rules: {
        "test/consistent-test-it": [
          "error",
          { fn: "it", withinDescribe: "it" },
        ],
        "test/no-identical-title": "error",
        "test/no-only-tests": "error",
        "test/prefer-hooks-in-order": "error",
        "test/prefer-lowercase-title": "error",

        ...overrides,
      },
    },
  ];
};
