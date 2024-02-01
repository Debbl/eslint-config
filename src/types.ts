import type { ParserOptions } from "@typescript-eslint/parser";
import type { FlatESLintConfig } from "eslint-define-config";
import type {
  IgnoresConfig,
  JavascriptConfig,
  JsoncConfig,
  MarkdownConfig,
  PrettierConfig,
  TestConfig,
  TomlConfig,
  YmlConfig,
} from "./configs";

export type Awaitable<T> = T | Promise<T>;
export type GetConfigOption<T extends (...args: any) => any> = Parameters<T>[0];

export interface ConfigItem extends FlatESLintConfig {
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

export interface OptionsOverrides {
  overrides?: ConfigItem["rules"];
}

export type ConfigFn = (options: OptionsOverrides) => ConfigItem[];

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
   * configs
   */
  presets?: ConfigItem[][];

  /**
   * Passing an object to configure the options.
   */
  ignores?: GetConfigOption<IgnoresConfig>;

  /**
   * Enable JavaScript support.
   * Passing an object to configure the options.
   * @default true
   */
  javascript?: GetConfigOption<JavascriptConfig>;

  /**
   * test config option
   */
  test?: GetConfigOption<TestConfig>;

  /**
   * jsonc config option
   */
  jsonc?: GetConfigOption<JsoncConfig>;

  /**
   * yml config option
   */
  yml?: GetConfigOption<YmlConfig>;

  /**
   * toml config option
   */
  toml?: GetConfigOption<TomlConfig>;

  /**
   * markdown config option
   */
  markdown?: GetConfigOption<MarkdownConfig>;

  /**
   * prettier config option
   */
  prettier?: GetConfigOption<PrettierConfig>;

  /**
   * Custom config
   */
  customConfig?: ConfigItem[] | ConfigItem;
}
