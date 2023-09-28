import type { OptionsConfigBasic } from "@debbl/eslint-config-basic";
import type { FlatESLintConfigItem } from "eslint-define-config";

export interface OptionsTypeScriptWithTypes {
  /**
   * When this options is provided, type aware rules will be enabled.
   * @see https://typescript-eslint.io/linting/typed-linting/
   */
  tsconfigPath?: string;
}
export interface OptionsConfigTs extends OptionsConfigBasic {
  /**
   * Enable TypeScript support.
   *
   * Passing an object to enable TypeScript Language Server support.
   *
   * @default auto-detect based on the dependencies
   */
  ts?: boolean | OptionsTypeScriptWithTypes;

  overrides?: OptionsConfigBasic["overrides"] & {
    ts?: FlatESLintConfigItem["rules"];
  };
}
