import type { ParserOptions } from '@typescript-eslint/parser'
import type { Linter } from 'eslint'
import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore'
import type {
  IgnoresConfig,
  JavascriptConfig,
  JsoncConfig,
  MarkdownConfig,
  PrettierConfig,
  TestConfig,
  TomlConfig,
  TypeScriptConfig,
  VueConfig,
  YmlConfig,
} from './configs'
import type { ReactConfig } from './configs/react'

export type Awaitable<T> = T | Promise<T>
export type GetConfigOption<T extends (...args: any) => any> = Parameters<T>[0]

export interface ConfigItem extends Linter.Config {
  // Relax plugins type limitation, as most of the plugins did not have correct type info yet.
  /**
   * An object containing a name-value mapping of plugin names to plugin objects. When `files` is specified, these plugins are only available to the matching files.
   *
   * @see [Using plugins in your configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
   */
  plugins?: Record<string, any>
}

export interface OptionsOverrides {
  overrides?: ConfigItem['rules']
}

export type ConfigFn = (options: OptionsOverrides) => Awaitable<ConfigItem[]>

export interface OptionsComponentExts {
  /**
   * Additional extensions for components.
   *
   * @example ['vue']
   * @default []
   */
  componentExts?: string[]
}

export interface OptionsTypeScriptParserOptions {
  /**
   * Additional parser options for TypeScript.
   */
  parserOptions?: Partial<ParserOptions>
}

export interface OptionsTypeScriptWithTypes {
  /**
   * When this options is provided, type aware rules will be enabled.
   * @see https://typescript-eslint.io/linting/typed-linting/
   */
  tsconfigPath?: string
}

export interface OptionsHasTypeScript {
  typescript?: boolean
}

export interface OptionsConfig extends OptionsComponentExts {
  /**
   * Enable gitignore support.
   * Passing an object to configure the options.
   * @default true
   */
  gitignore?: boolean | FlatGitignoreOptions

  /**
   * Enable gitignore support.
   * Passing an object to configure the options.
   * @default true
   */
  ignores?: boolean | GetConfigOption<IgnoresConfig>

  /**
   * Enable JavaScript support.
   * Passing an object to configure the options.
   * @default true
   */
  javascript?: GetConfigOption<JavascriptConfig>

  /**
   * Enable TypeScript support.
   *
   * Passing an object to enable TypeScript Language Server support.
   *
   * @default false
   */
  typescript?: boolean | GetConfigOption<TypeScriptConfig>

  /**
   * Enable test support.
   *
   * @default true
   */
  test?: boolean | GetConfigOption<TestConfig>

  /**
   * Enable Vue support.
   *
   * @default false
   */
  vue?: boolean | GetConfigOption<VueConfig>

  /**
   * Enable React support, Passing an object to enable Next.js support.
   *
   * @default false
   */
  react?: boolean | GetConfigOption<ReactConfig>

  /**
   * Enable solid support, Passing an object to enable Next.js support.
   *
   * @default false
   */
  solid?: boolean

  /**
   * Enable JSONC support.
   *
   * @default true
   */
  jsonc?: boolean | GetConfigOption<JsoncConfig>

  /**
   * Enable YML support.
   *
   * @default true
   */
  yml?: boolean | GetConfigOption<YmlConfig>

  /**
   * Enable TOML support.
   * @default true
   */
  toml?: boolean | GetConfigOption<TomlConfig>

  /**
   * Enable Markdown support.
   *
   * @default true
   */
  markdown?: boolean | GetConfigOption<MarkdownConfig>

  /**
   * Enable prettier rules.
   *
   * @default true
   */
  prettier?: boolean | Omit<GetConfigOption<PrettierConfig>, 'tailwindcss'>

  /**
   * Enable Tailwind CSS support.
   *
   * if set to "prettier", it will use `prettier-plugin-tailwindcss`
   * @see https://github.com/tailwindlabs/prettier-plugin-tailwindcss
   *
   * @default false
   */
  tailwindcss?: boolean | 'prettier'
}
