// @ts-check
import config, { typescript } from "./dist/index.js";

export default config({
  ignores: {
    files: ["fixtures"],
  },
  presets: [typescript()],
});
