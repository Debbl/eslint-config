module.exports = {
  extends: ["prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      "warn",
      {
        printWidth: 100, // 打印宽度， 一行最长120个字符
        tabWidth: 2, // 缩进的空格数
        useTabs: false, // 缩进使用空格，不适用制表符
        semi: true, // 语句末尾添加分号
        singleQuote: false, // 使用单引号
        trailingComma: "all", // 尾随逗号
        bracketSpacing: true, // { foo: bar } 有空格
        quoteProps: "consistent", // 对象属性 引号
      },
      {
        usePrettierrc: false,
        fileInfoOptions: {
          withNodeModules: true,
        },
      },
    ],
  },
};
