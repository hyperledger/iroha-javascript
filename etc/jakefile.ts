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
  PUBLIC_PACKAGES_WITH_API_REPORT,
  getBundlePackageExternals,
  getBundlePackageInput,
  getBundlePackageOutput,
  getPackageApiExtractorConfigFile,
  scopePackage,
} from './meta'
import { Extractor, ExtractorConfig, ExtractorResult } from '@microsoft/api-extractor'
import * as esbuild from 'esbuild'

async function runApiExtractor(localBuild = false) {
  for (const pkg of PUBLIC_PACKAGES_WITH_API_REPORT) {
    const extractorConfig: ExtractorConfig = ExtractorConfig.loadFileAndPrepare(getPackageApiExtractorConfigFile(pkg))

    // Invoke API Extractor
    const extractorResult: ExtractorResult = Extractor.invoke(extractorConfig, {
      localBuild,
      showVerboseMessages: true,
    })

    if (!extractorResult.succeeded) {
      throw new Error(
        `API Extractor for package ${pkg} completed with ${extractorResult.errorCount} errors` +
          ` and ${extractorResult.warningCount} warnings`,
      )
    }
  }
}

async function bundleSinglePackage(name: BundlePackage, format: 'esm' | 'cjs') {
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

task('build-isomoprhic-ws-n-fetch', async () => {
  await $`pnpm build:isomorphic-ws-and-fetch`
})

task('build-bundle', async () => {
  function* bundles(): Generator<Promise<void>> {
    for (const name of BUNDLE_PACKAGES) {
      for (const format of ['esm', 'cjs'] as const) {
        yield bundleSinglePackage(name, format)
      }
    }
  }

  await Promise.all(bundles())
})

desc('Extract APIs and verify (also rollup .d.ts)')
task('api-extract', ['build-tsc'], async () => {
  await runApiExtractor()
})

desc('Extract APIs and update them')
task('api-extract-local', ['build-tsc'], async () => {
  await runApiExtractor(true)
})

desc('Build everything')
task('build', ['clean', 'build-tsc', 'build-isomoprhic-ws-n-fetch', 'api-extract', 'build-bundle'])

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
