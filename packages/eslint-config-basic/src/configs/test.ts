import type { FlatESLintConfigItem } from "eslint-define-config";
import { pluginNoOnlyTests } from "src/plugins";
import { GLOB_TESTS } from "../../../../src/globs";
import { OFF } from "../../../../src/flags";
import type { OptionsIsInEditor } from "../../../../src/types";

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
