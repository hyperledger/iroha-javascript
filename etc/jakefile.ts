/**
 * TODO move client package test scripts here, so it will be possible
 * to avoid duplicated builds during CI.
 */

import 'jake'
import del from 'del'
import { $ } from 'zx'
import { PUBLIC_PACKAGES, scopePackage } from './meta'

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

task('rollup', ['build-tsc'], async () => {
  await $`pnpm build:rollup`
})

desc('Build everything')
task('build', ['clean', 'build-tsc', 'rollup'])

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
