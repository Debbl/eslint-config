const { isPackageExists } = require("local-pkg");

const isReact = isPackageExists("react");
const isVue = isPackageExists("vue");
const isSolid = isPackageExists("solid-js");
const isPrettier = isPackageExists("prettier");
const isTailwindCSS = isPackageExists("tailwindcss");

module.exports = {
  extends: [
    isReact ? "@debbl/eslint-config-react" : null,
    isVue ? "@debbl/eslint-config-vue" : null,
    isSolid ? "@debbl/eslint-config-solid" : null,
    isTailwindCSS ? "@debbl/eslint-config-tailwindcss" : null,
    isPrettier ? "@debbl/eslint-config-prettier" : null,
  ],
};
