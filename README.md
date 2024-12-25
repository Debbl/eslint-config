# [@debbl/eslint-config](https://github.com/Debbl/eslint-config)

[![npm](https://img.shields.io/npm/v/@debbl/eslint-config?label=@debbl/eslint-config&color=444&logo=npm)](https://npmjs.com/package/@debbl/eslint-config)

## Credits

> https://github.com/antfu/eslint-config

## Install

```bash
pnpm i eslint @debbl/eslint-config -D
```

## Config `eslint.config.js`

### Default config

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
import { defineConfig } from "@debbl/eslint-config";

export default defineConfig();
```

## Config `Prettier`, will override default rules

```js
import { defineConfig } from "@debbl/eslint-config";

export default defineConfig({
  typescript: true,
  prettier: {
    semi: false,
  },
});
```

## Full OptionConfig

[types.ts](./src/types.ts#L65)
