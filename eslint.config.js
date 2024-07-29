// @ts-check
import { defineConfig } from "./dist/index.js";

export default defineConfig({
  ignores: {
    files: ["fixtures"],
  },
  typescript: true,
});
