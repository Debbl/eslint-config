import type { FlatESLintConfigItem } from "eslint-define-config";
import { pluginNoOnlyTests } from "src/plugins";
import { GLOB_TESTS, OFF } from "../share";
import type { OptionsIsInEditor } from "../share";

export function test(options: OptionsIsInEditor = {}): FlatESLintConfigItem[] {
  return [
    {
      files: GLOB_TESTS,
      plugins: {
        "no-only-tests": pluginNoOnlyTests,
      },
      rules: {
        "no-only-tests/no-only-tests": options.isInEditor ? OFF : "error",
      },
    },
  ];
}
