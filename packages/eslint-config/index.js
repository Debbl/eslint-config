const { isPackageExists } = require("local-pkg");

const isReact = isPackageExists("react");
const isVue = isPackageExists("vue");
const isSolid = isPackageExists("solid-js");
const isPrettier = isPackageExists("prettier");
const isTailwindCSS = isPackageExists("tailwindcss");

const allowExtends = [
  isReact ? "@debbl/eslint-config-react" : null,
  isVue ? "@debbl/eslint-config-vue" : null,
  isSolid ? "@debbl/eslint-config-solid" : null,
  isTailwindCSS ? "@debbl/eslint-config-tailwindcss" : null,
  isPrettier ? "@debbl/eslint-config-prettier" : null,
].filter(Boolean);

module.exports = {
  extends: allowExtends,
};
