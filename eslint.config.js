import config from "./dist/index.js";

export default config({
  ignores: {
    files: ["fixtures"],
  },
  typescript: true,
});
