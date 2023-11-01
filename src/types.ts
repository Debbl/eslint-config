import type { ParserOptions } from "@typescript-eslint/parser";

import type { RequiredOptions } from "prettier";
import type { FlatESLintConfigItem } from "eslint-define-config";

export type PrettierRequiredOptions = Partial<RequiredOptions>;

export interface ConfigItem extends FlatESLintConfigItem {
  /**
   * Custom name of each config item
   */
  name?: string;

  // Relax plugins type limitation, as most of the plugins did not have correct type info yet.
  /**
   * An object containing a name-value mapping of plugin names to plugin objects. When `files` is specified, these plugins are only available to the matching files.
   *
   * @see [Using plugins in your configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
   */
  plugins?: Record<string, any>;
}

export interface OptionsComponentExts {
  /**
   * Additional extensions for components.
   *
   * @example ['vue']
   * @default []
   */
  componentExts?: string[];
}

export interface OptionsTypeScriptParserOptions {
  /**
   * Additional parser options for TypeScript.
   */
  parserOptions?: Partial<ParserOptions>;
}

export interface OptionsTypeScriptWithTypes {
  /**
   * When this options is provided, type aware rules will be enabled.
   * @see https://typescript-eslint.io/linting/typed-linting/
   */
  tsconfigPath?: string;
}

export interface OptionsHasTypeScript {
  typescript?: boolean;
}

export interface OptionsConfig extends OptionsComponentExts {
  /**
   * Enable gitignore support.
   * Passing an object to configure the options.
   * @default true
   */
  gitignore?:
    | boolean
    | {
        ignorePath: string;
      };

  /**
   * Enable TypeScript support.
   *
   * Passing an object to enable TypeScript Language Server support.
   *
   * @default false
   */
  typescript?: boolean | OptionsTypeScriptWithTypes;

  /**
   * Enable test support.
   *
   * @default true
   */
  test?: boolean;

  /**
   * Enable Vue support.
   *
   * @default false
   */
  vue?: boolean;

  /**
   * Enable React support.
   *
   * @default false
   */
  react?: boolean;

  /**
   * Enable JSONC support.
   *
   * @default true
   */
  jsonc?: boolean;

  /**
   * Enable YML support.
   *
   * @default true
   */
  yml?: boolean;

  /**
   * Enable Markdown support.
   *
   * @default true
   */
  markdown?: boolean;

  /**
   * Enable prettier rules.
   *
   * @default true
   */
  prettier?: boolean | PrettierRequiredOptions;

  /**
   * Custom config
   */
  customConfig?: ConfigItem[] | ConfigItem;
}
