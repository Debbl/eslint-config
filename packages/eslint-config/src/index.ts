import { config } from "./factory";

export {
  basic,
  comments,
  ignores,
  imports,
  js,
  jsdoc,
  jsonc,
  markdown,
  node,
  sortPackageJson,
  sortTsconfig,
  test,
  unicorn,
  yml,
} from "@debbl/eslint-config-basic";
export { ts, tsWithLanguageServer } from "@debbl/eslint-config-ts";
export { prettier } from "@debbl/eslint-config-prettier";
export { vue } from "@debbl/eslint-config-vue";
export { solid } from "@debbl/eslint-config-solid";
export { react } from "@debbl/eslint-config-react";

export * from "./types";

export default config;

export { config };
