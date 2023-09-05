const { isPackageExists } = require("local-pkg");

const isTS = isPackageExists("typescript");
const isReact = isPackageExists("react");
const isVue = isPackageExists("vue");
const isSolid = isPackageExists("solid-js");
const isPrettier = isPackageExists("prettier");
const isTailwindCSS = isPackageExists("tailwindcss");

const allowExtends = [
  "@debbl/eslint-config-basic",
  isTS ? "@debbl/eslint-config-ts" : null,
  isReact ? "@debbl/eslint-config-react" : null,
  isVue ? "@debbl/eslint-config-vue" : null,
  isSolid ? "@debbl/eslint-config-solid" : null,
  isTailwindCSS ? "@debbl/eslint-config-tailwindcss" : null,
  isPrettier ? "@debbl/eslint-config-prettier" : null,
].filter(Boolean);

module.exports = {
  extends: allowExtends,
};
