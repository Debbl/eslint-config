# 参考

> https://github.com/antfu/eslint-config

# 使用

- `@debbl/eslint-config-basic` 基础配置 JavaScript
- `@debbl/eslint-config-ts` TypeScript
- `@debbl/eslint-config-vue` Vue
- `@debbl/eslint-config-react` React
- `@debbl/eslint-config-prettier` 添加 Prettier

## 安装

```bash
pnpm i @debbl/eslint-config-basic -D
```

### 配置 `.eslintrc.cjs`

```js
module.exports = {
  extends: ["@debbl/eslint-config-basic"],
};
```

### 配置 `Prettier`, 会覆盖默认的规则

```js
module.exports = {
  extends: ["@debbl/eslint-config-basic"],
  rules: {
    "prettier/prettier": [
      "warn",
      {
        printWidth: 100, // 打印宽度， 一行最长120个字符
        tabWidth: 2, // 缩进的空格数
        useTabs: false, // 缩进使用空格，不适用制表符
        semi: true, // 语句末尾添加分号
        singleQuote: false, // 使用单引号
        trailingComma: "all", // 尾随逗号
        bracketSpacing: true, // { foo: bar } 有空格
        quoteProps: "consistent", // 对象属性 引号
      },
      {
        usePrettierrc: false,
        fileInfoOptions: {
          withNodeModules: true,
        },
      },
    ],
  },
};
```
