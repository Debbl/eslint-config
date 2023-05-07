module.exports = {
  extends: ["prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      "warn",
      {
        quoteProps: "consistent",
      },
    ],
  },
};
