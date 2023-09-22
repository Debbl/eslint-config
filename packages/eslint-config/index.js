const Basic = require("@debbl/eslint-config-basic");
const TS = require("@debbl/eslint-config-ts");
const Prettier = require("@debbl/eslint-config-prettier");
const React = require("@debbl/eslint-config-react");
const Vue = require("@debbl/eslint-config-vue");
const Solid = require("@debbl/eslint-config-solid");
const TailwindCSS = require("@debbl/eslint-config-tailwindcss");

function Auto() {
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

  return allowExtends;
}

module.exports = {
  Auto,
  Basic,
  TS,
  Prettier,
  React,
  Vue,
  Solid,
  TailwindCSS,
};
