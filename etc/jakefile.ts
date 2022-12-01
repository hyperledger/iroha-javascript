/**
 * TODO move client package test scripts here, so it will be possible
 * to avoid duplicated builds during CI.
 */

import 'jake'
import del from 'del'
import { $ } from 'zx'
import { PUBLIC_PACKAGES, artifactsToClean, scopePackage } from './meta'

desc('Clean all build artifacts')
task('clean', async () => {
  await del(artifactsToClean())
})

namespace('compile-artifacts', () => {
  desc('Compile data-model schema with Kagami')
  task('data-model-schema', ['clean'], async () => {
    await $`pnpm --filter data-model-schema compile-with-kagami`
  })

  desc('Generate data-model codecs according to the compiled schema')
  task('data-model-codegen', ['clean', 'compile-artifacts:data-model-schema'], async () => {
    await $`pnpm --filter data-model codegen`
  })

  desc('Produce Rust SCALE samples for data-model tests')
  task('data-model-rust-samples', ['clean'], async () => {
    await $`pnpm --filter data-model-rust-samples produce-samples`
  })

  desc('Compile all necessary artifacts')
  task('all', ['data-model-schema', 'data-model-rust-samples', 'data-model-codegen'])
})

namespace('build', () => {
  desc('Recursively run TypeScript Compiler in each package')
  task('tsc', ['clean', 'compile-artifacts:all'], async () => {
    const filters = ['!monorepo', 'data-model', 'client', 'i64-fixnum'].flatMap((x) => ['--filter', x])
    await $`pnpm --parallel ${filters} build:tsc`
  })

  desc('Rollup')
  task('rollup', ['build:tsc'], async () => {
    await $`pnpm rollup -c`
  })

  desc('Run TypeScript Compiler and Rollup')
  task('all', ['build:rollup'])
})

namespace('test', () => {
  task('unit', ['compile-artifacts:all'], async () => {
    await $`pnpm vitest run`
  })

  task('crypto', async () => {
    await $`pnpm --filter monorepo-crypto test`
  })

  task('client-integration', ['build:all'], async () => {
    await $`pnpm --filter client test:integration`
  })

  desc('Run all tests')
  task('all', ['test:unit', 'test:crypto', 'test:client-integration'])
})

desc('Perform type checking in the whole repo')
task('type-check', ['compile-artifacts:all'], async () => {
  await $`pnpm tsc --noEmit`
})

task('lint', async () => {
  await $`pnpm lint`
})

desc('Performs all kinds of checks from artifacts compilation and linting to end-2-end tests')
task('run-all-checks', ['type-check', 'lint', 'build:all', 'test:all'])

desc('Publish all public packages')
task('publish-all', ['run-all-checks', 'build:all'], async () => {
  const filters = [
    ...PUBLIC_PACKAGES.toSeq()
      .map(scopePackage)
      .flatMap((x) => [`--filter`, x])
      .toList(),
  ].flat()

  await $`pnpm ${filters} publish`
})
