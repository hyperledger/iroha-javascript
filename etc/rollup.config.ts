import { RollupOptions, defineConfig } from 'rollup'
import { BUNDLE_PACKAGES, getPackageRollupMeta } from './meta'
import PluginDTS from 'rollup-plugin-dts'
import PluginReplace from '@rollup/plugin-replace'

function replaceVitest() {
  return PluginReplace({
    preventAssignment: true,
    values: {
      'import.meta.vitest': 'undefined',
    },
  })
}

function* generateRollups(): Generator<RollupOptions> {
  for (const pkg of BUNDLE_PACKAGES) {
    for (const { inputBase, outputBase, external } of getPackageRollupMeta(pkg)) {
      yield {
        input: inputBase + '.d.ts',
        external,
        plugins: [PluginDTS(), replaceVitest()],
        output: [{ file: outputBase + '.d.ts', format: 'esm' }],
      }

      yield {
        input: inputBase + '.js',
        external,
        plugins: [replaceVitest()],
        output: [
          { file: outputBase + '.mjs', format: 'esm', sourcemap: true },
          { file: outputBase + '.cjs', format: 'cjs', sourcemap: true },
        ],
      }
    }
  }
}

export default defineConfig([...generateRollups()])
