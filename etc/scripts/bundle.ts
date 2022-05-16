import * as esbuild from 'esbuild'
import {
  BUNDLE_PACKAGES,
  BundlePackage,
  getBundlePackageExternals,
  getBundlePackageInput,
  getBundlePackageOutput,
} from '../meta'

async function build(name: BundlePackage, format: 'esm' | 'cjs') {
  await esbuild.build({
    entryPoints: [getBundlePackageInput(name)],
    bundle: true,
    outfile: getBundlePackageOutput(name, format),
    external: getBundlePackageExternals(name).toArray(),
    target: 'esnext',
    platform: 'neutral',
    format,
    sourcemap: true,
    logLevel: 'info',
    define: {
      'import.meta.vitest': 'undefined',
    },
  })
}

function* promises(): Generator<Promise<void>> {
  const FORMATS = ['esm', 'cjs'] as const

  for (const name of BUNDLE_PACKAGES) {
    for (const format of FORMATS) {
      yield build(name, format)
    }
  }
}

export async function bundle() {
  await Promise.all(promises())
}
