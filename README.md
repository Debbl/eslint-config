# [@debbl/eslint-config](https://github.com/Debbl/eslint-config)

[![npm](https://img.shields.io/npm/v/@debbl/eslint-config?label=@debbl/eslint-config&color=444&logo=npm)](https://npmjs.com/package/@debbl/eslint-config)

## 参考

> https://github.com/antfu/eslint-config

## 安装

```bash
pnpm i eslint @debbl/eslint-config -D
```

## 配置 `eslint.config.js`

### 默认启动配置

- ignores
- javascript
- comments
- node
- jsdoc
- imports
- unicorn
- sortKeys
- test
- jsonc
- yml
- toml
- markdown
- prettier

```js
import { config } from "@debbl/eslint-config";

export default config();
```

## 配置 `Prettier`, 会覆盖默认的规则

```js
import config from "./dist/index.js";

export default config({
  typescript: true,
  prettier: {
    semi: false,
  },
});
```

## 完整的 OptionConfig

[types.ts](./src/types.ts#L70)

```ts
export interface OptionsConfig extends OptionsComponentExts {
  /**
   * Enable gitignore support.
   * Passing an object to configure the options.
   * @default true
   */
  ignores?: boolean | GetConfigOption<IgnoresConfig>;

  /**
   * Enable JavaScript support.
   * Passing an object to configure the options.
   * @default true
   */
  javascript?: GetConfigOption<JavascriptConfig>;

  /**
   * Enable TypeScript support.
   *
   * Passing an object to enable TypeScript Language Server support.
   *
   * @default false
   */
  typescript?: boolean | GetConfigOption<TypeScriptConfig>;

  /**
   * Enable test support.
   *
   * @default true
   */
  test?: boolean | GetConfigOption<TestConfig>;

  /**
   * Enable Vue support.
   *
   * @default false
   */
  vue?: boolean | GetConfigOption<VueConfig>;

  /**
   * Enable React support, Passing an object to enable Next.js support.
   *
   * @default false
   */
  react?: boolean | GetConfigOption<ReactConfig>;

  /**
   * Enable JSONC support.
   *
   * @default true
   */
  jsonc?: boolean | GetConfigOption<JsoncConfig>;

  /**
   * Enable YML support.
   *
   * @default true
   */
  yml?: boolean | GetConfigOption<YmlConfig>;

  /**
   * Enable TOML support.
   * @default true
   */
  toml?: boolean | GetConfigOption<TomlConfig>;

  /**
   * Enable Markdown support.
   *
   * @default true
   */
  markdown?: boolean | GetConfigOption<MarkdownConfig>;

  /**
   * Enable prettier rules.
   *
   * @default true
   */
  prettier?: boolean | GetConfigOption<PrettierConfig>;

  /**
   * Enable Tailwind CSS support.
   * @default false
   */
  tailwindcss?: boolean;

  /**
   * Custom config
   */
  customConfig?: ConfigItem[] | ConfigItem;
}
```
