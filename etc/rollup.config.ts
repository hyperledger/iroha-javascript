import { RollupOptions, defineConfig } from 'rollup'
import { BUNDLE_PACKAGES, getPackageRollupMeta } from './meta'
import dts from 'rollup-plugin-dts'
import replace from '@rollup/plugin-replace'

function replaceVitest() {
  return replace({
    preventAssignment: true,
    values: {
      'import.meta.vitest': 'undefined',
    },
  })
}

function* generateRolls(): Generator<RollupOptions> {
  for (const pkg of BUNDLE_PACKAGES) {
    for (const { inputBase, outputBase, external } of getPackageRollupMeta(pkg)) {
      yield {
        input: inputBase + '.d.ts',
        external,
        plugins: [dts(), replaceVitest()],
        output: [{ file: outputBase + '.d.ts', format: 'esm' }],
      }

      yield {
        input: inputBase + '.js',
        external,
        plugins: [replaceVitest()],
        output: [
          { file: outputBase + '.mjs', format: 'esm' },
          { file: outputBase + '.cjs', format: 'cjs' },
        ],
      }
    }
  }
}

export default defineConfig([...generateRolls()])
