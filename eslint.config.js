import config from "./dist/index.js";

export default config({
  typescript: true,
  customConfig: {
    ignores: ["fixtures"],
  },
});
