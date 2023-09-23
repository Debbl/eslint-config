import type { FlatESLintConfigItem } from "eslint-define-config";
import { GLOB_EXCLUDE } from "../../../../src/globs";

export const ignores: FlatESLintConfigItem[] = [{ ignores: GLOB_EXCLUDE }];
