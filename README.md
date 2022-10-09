# 参考
> https://github.com/antfu/eslint-config

# 使用
- `@debbl/eslint-config-basic` 基础配置 JavaScript
- `@debbl/eslint-config-ts` TypeScript
- `@debbl/eslint-config-vue` Vue
- `@debbl/eslint-config-react` React
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