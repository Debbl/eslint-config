// @ts-check
import { defineConfig } from './dist/index.mjs'

export default defineConfig({
  ignores: {
    files: ['fixtures'],
  },
  typescript: true,
})
