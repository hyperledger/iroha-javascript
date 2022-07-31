/**
 * TODO move client package test scripts here, so it will be possible
 * to avoid duplicated builds during CI.
 */

import 'jake'
import del from 'del'
import { $ } from 'zx'
import {
  BUNDLE_PACKAGES,
  BundlePackage,
  PUBLIC_PACKAGES,
  getBundlePackageExternals,
  getBundlePackageInOut,
  scopePackage,
} from './meta'
import * as esbuild from 'esbuild'

async function bundleSinglePackage(name: BundlePackage) {
  for (const { inputBase, outputBase } of getBundlePackageInOut(name)) {
    for (const format of ['esm', 'cjs'] as const) {
      const outfile = `${outputBase}.${format === 'esm' ? 'mjs' : 'cjs'}`

      await esbuild.build({
        entryPoints: [inputBase + `.js`],
        bundle: true,
        outfile,
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
  }
}

desc('Clean all build artifacts')
task('clean', async () => {
  await del([
    '**/dist',
    // their dists are static
    '!./packages/crypto/packages/*/dist',
    '**/dist-tsc',
  ])
})

task('build-tsc', ['clean'], async () => {
  await $`pnpm build:tsc`
})

desc('Rollup `.d.ts` files')
task('build-dts', ['build-tsc'], async () => {
  await $`pnpm build:dts`
})

task('build-bundle', ['build-tsc'], async () => {
  function* bundles(): Generator<Promise<void>> {
    for (const name of BUNDLE_PACKAGES) {
      yield bundleSinglePackage(name)
    }
  }

  await Promise.all(bundles())
})

desc('Build everything')
task('build', ['clean', 'build-tsc', 'api-extract', 'build-bundle'])

desc('Like `build`, but updates API reports')
task('build-local', ['clean', 'build-tsc', 'build-dts', 'build-bundle'])

desc('Publish all public packages')
task('publish-all', async () => {
  const filters = [
    ...PUBLIC_PACKAGES.toSeq()
      .map(scopePackage)
      .map((x) => [`--filter`, x])
      .toList(),
  ].flat()

  await $`pnpm ${filters} publish --no-git-checks`
})
