module.exports = {
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "@debbl/eslint-config-ts",
  ],
  settings: {
    react: {
      version: "18.0",
    },
  },
  rules: {
    "jsx-quotes": [
      "error",
      "prefer-double",
    ],
    "react/react-in-jsx-scope": "off",
    "react/jsx-indent": [1, 2],
    "react/jsx-indent-props": [1, 2],
    "react/jsx-closing-bracket-location": [1, { selfClosing: "tag-aligned", nonEmpty: "tag-aligned" }],
  },
};
