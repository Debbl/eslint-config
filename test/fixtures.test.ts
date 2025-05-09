import { join, resolve } from 'node:path'
import { execa } from 'execa'
import fg from 'fast-glob'
import fs from 'fs-extra'
import { afterAll, beforeAll, it } from 'vitest'
import { GLOB_TOML } from '../src/globs'
import type { OptionsConfig } from '../src/types'

beforeAll(async () => {
  await fs.rm('_fixtures', { recursive: true, force: true })
})
afterAll(async () => {
  await fs.rm('_fixtures', { recursive: true, force: true })
})

runWithConfig('js', {
  typescript: false,
  vue: false,
  customConfig: {
    ignores: [GLOB_TOML],
    rules: {
      'prettier/prettier': 'error',
    },
  },
})
runWithConfig('all', {
  typescript: true,
  vue: true,
  customConfig: {
    ignores: [GLOB_TOML],
    rules: {
      'prettier/prettier': 'error',
    },
  },
})
runWithConfig('no-style', {
  typescript: true,
  vue: true,
  prettier: false,
})
runWithConfig('tab-single-quotes-no-semi', {
  typescript: true,
  vue: true,
  prettier: {
    semi: false,
    useTabs: true,
    singleQuote: true,
  },
  customConfig: {
    ignores: [GLOB_TOML],
    rules: {
      'prettier/prettier': 'error',
    },
  },
})

runWithConfig('ts-override', {
  typescript: true,
  customConfig: {
    ignores: [GLOB_TOML],
    rules: {
      'prettier/prettier': 'error',

      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
  },
})

runWithConfig('hooks', {
  react: true,
  customConfig: {
    ignores: [GLOB_TOML],
    rules: {
      'prettier/prettier': 'error',

      'react/prop-types': 'off',
      'react/no-unknown-property': 'off',
      'react/no-unescaped-entities': 'off',
    },
  },
})

function runWithConfig(name: string, configs: OptionsConfig) {
  it.concurrent(
    name,
    async ({ expect }) => {
      const from = resolve('fixtures/input')
      const output = resolve('fixtures/output', name)
      const target = resolve('_fixtures', name)

      await fs.copy(from, target, {
        filter: (src) => {
          return !src.includes('node_modules')
        },
      })
      await fs.writeFile(
        join(target, 'eslint.config.js'),
        [
          '// @eslint-disable',
          "import { defineConfig } from '@debbl/eslint-config';",
          '',
          'export default defineConfig(',
          `  ${JSON.stringify(configs)}`,
          ');',
        ].join('\n'),
      )

      const execaChildProcess = await execa('npx', ['eslint', '.', '--fix'], {
        cwd: target,
        stdio: 'pipe',
      })

      if (name === 'hooks') {
        expect(execaChildProcess.stdout.split('\n')[2].trim()).toBe(
          "9:6  warning  React Hook useEffect has a missing dependency: 'count'. Either include it or remove the dependency array  react-hooks/exhaustive-deps",
        )
      }

      const files = await fg('**/*', {
        ignore: ['node_modules', 'eslint.config.js'],
        cwd: target,
      })

      await Promise.all(
        files.map(async (file) => {
          const content = await fs.readFile(join(target, file), 'utf-8')
          const source = await fs.readFile(join(from, file), 'utf-8')

          const outputPath = join(output, file)
          if (content === source) {
            if (fs.existsSync(outputPath)) fs.remove(outputPath)
            return
          }

          await expect.soft(content).toMatchFileSnapshot(join(output, file))
        }),
      )
    },
    60_000,
  )
}
