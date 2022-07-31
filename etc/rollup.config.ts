import { RollupOptions, defineConfig } from 'rollup'
import { BUNDLE_PACKAGES, getBundlePackageInOut } from './meta'
import PluginDTS from 'rollup-plugin-dts'

function* generateRollups(): Generator<RollupOptions> {
  for (const pkg of BUNDLE_PACKAGES) {
    for (const { inputBase, outputBase } of getBundlePackageInOut(pkg)) {
      yield {
        input: inputBase + '.d.ts',
        plugins: [PluginDTS()],
        output: [{ file: outputBase + '.d.ts', format: 'esm' }],
      }
    }
  }
}

export default defineConfig([...generateRollups()])
