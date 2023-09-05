const path = require("node:path");
const { cwd } = require("node:process");

const isTS = isPackageExists("typescript");
const isReact = isPackageExists("react");
const isVue = isPackageExists("vue");
const isSolid = isPackageExists("solid-js");
const isTailwindCSS = isPackageExists("tailwindcss");

const allowExtends = [
  isReact ? "@debbl/eslint-config-react" : null,
  isVue ? "@debbl/eslint-config-vue" : null,
  isSolid ? "@debbl/eslint-config-solid" : null,
  isTailwindCSS ? "@debbl/eslint-config-tailwindcss" : null,
].filter(Boolean);

if (allowExtends.length === 0) {
  if (isTS) {
    allowExtends.push("@debbl/eslint-config-ts");
  } else {
    allowExtends.push("@debbl/eslint-config-basic");
  }
}

// use prettier
allowExtends.push("@debbl/eslint-config-prettier");

// eslint-disable-next-line no-console
console.info("[@debbl/eslint-config] Current running extends:", allowExtends);

// determine if the package is exists
function isPackageExists(name) {
  const {
    dependencies = [],
    devDependencies = [],
    peerDependencies = [],
  } = require(path.resolve(cwd(), "./package.json"));

  return (
    Object.keys(dependencies || {}).includes(name) ||
    Object.keys(devDependencies || {}).includes(name) ||
    Object.keys(peerDependencies || {}).includes(name)
  );
}

module.exports = {
  extends: allowExtends,
};
