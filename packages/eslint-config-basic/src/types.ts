import type { FlatESLintConfigItem } from "eslint-define-config";

export interface OptionsComponentExts {
  /**
   * Additional extensions for components.
   *
   * @example ['vue']
   * @default []
   */
  componentExts?: string[];
}

export interface OptionsIsInEditor {
  isInEditor?: boolean;
}

export interface OptionsOverrides {
  overrides?: FlatESLintConfigItem["rules"];
}

export interface OptionsConfigBasic extends OptionsComponentExts {
  /**
   * Control to disable some rules in editors.
   * @default auto-detect based on the process.env
   */
  isInEditor?: boolean;

  /**
   * Provide overrides for rules for each integration.
   */
  overrides?: {
    js?: FlatESLintConfigItem["rules"];
    test?: FlatESLintConfigItem["rules"];
    jsonc?: FlatESLintConfigItem["rules"];
    markdown?: FlatESLintConfigItem["rules"];
    yaml?: FlatESLintConfigItem["rules"];
  };

  /**
   * Enable test support.
   *
   * @default true
   */
  test?: boolean;

  /**
   * Enable JSONC support.
   *
   * @default true
   */
  jsonc?: boolean;

  /**
   * Enable YAML support.
   *
   * @default true
   */
  yaml?: boolean;

  /**
   * Enable Markdown support.
   *
   * @default true
   */
  markdown?: boolean;
}
