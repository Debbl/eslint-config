# [@debbl/eslint-config](https://github.com/Debbl/eslint-config)

[![npm](https://img.shields.io/npm/v/@debbl/eslint-config?color=444&label=)](https://npmjs.com/package/@debbl/eslint-config)

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

[types.ts](./src/types.ts#L52)

```ts
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
   * Enable JSX related rules.
   *
   * Currently only stylistic rules are included.
   *
   * @default true
   */
  jsx?: boolean;

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
```