import chalk from 'chalk'
import consola from 'consola'
import del from 'del'
import 'jake'
import path from 'path'
import { $, cd } from 'zx'
import {
  CRYPTO_MONOREPO_ROOT,
  IROHA_CRYPTO_TARGETS,
  WASM_PACK_CRATE_DIR,
  WASM_PACK_OUT_NAME,
  WASM_PACK_TARGETS,
  wasmPackOutDirForTarget,
  irohaCryptoTargetOrCorePackagePaths,
} from './meta'
import { List } from 'immutable'

async function preserveCwd<T>(fn: () => Promise<T>): Promise<T> {
  const preserved = process.cwd()
  try {
    const ret = await fn()
    return ret
  } finally {
    cd(preserved)
  }
}

namespace('wasm', () => {
  task('clean', async () => {
    const dirsToClean = WASM_PACK_TARGETS.map((a) => wasmPackOutDirForTarget(a))
    consola.info(
      'Cleaning:\n' +
        dirsToClean
          .map((a) => path.relative(CRYPTO_MONOREPO_ROOT, a))
          .map((a) => `  ` + chalk.red(a))
          .join('\n'),
    )
    await del(dirsToClean)
  })

  task('build-targets', async () => {
    await preserveCwd(async () => {
      cd(WASM_PACK_CRATE_DIR)

      for (const target of WASM_PACK_TARGETS) {
        const outDir = wasmPackOutDirForTarget(target)
        await $`wasm-pack build --target ${target} --out-dir ${outDir} --out-name ${WASM_PACK_OUT_NAME}`
      }
    })
  })

  desc('dev')
  task('keep-only-necessary', async () => {
    function* patterns() {
      for (const target of WASM_PACK_TARGETS) {
        const root = wasmPackOutDirForTarget(target)
        yield path.join(root, '*')
        yield path.join(root, '.*')
        yield '!' + path.join(root, WASM_PACK_OUT_NAME + '{.js,.d.ts,_bg.wasm,_bg.js,_bg.wasm.d.ts}')
      }
    }

    const deleted = await del([...patterns()])
    consola.info(
      'Deleted:\n' +
        deleted
          .map((a) => path.relative(CRYPTO_MONOREPO_ROOT, a))
          .map((a) => `  ` + chalk.red(a))
          .join('\n'),
    )
  })
})

namespace('rollup', () => {
  task('clean', async () => {
    const dists = List(IROHA_CRYPTO_TARGETS)
      .map((a) => irohaCryptoTargetOrCorePackagePaths(a).dist)
      .push(irohaCryptoTargetOrCorePackagePaths('core').dist)

    consola.info(
      'Cleaning:\n' +
        dists
          .map((a) => path.relative(CRYPTO_MONOREPO_ROOT, a))
          .map((a) => `  ` + chalk.red(a))
          .join('\n'),
    )

    await del(dists.toArray())
  })

  task('all', async () => {
    await $`pnpm rollup -c`
  })
})

desc('Build wasm-pack for each target with only necessary artifacts needed for rolling up packages on top of it')
task('build-wasm-pkgs', ['wasm:clean', 'wasm:build-targets', 'wasm:keep-only-necessary'])

desc('Rollup packages on top of wasm-pack artifacts')
task('rollup', ['rollup:clean', 'rollup:all'])
