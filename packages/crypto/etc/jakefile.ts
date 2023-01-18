import chalk from 'chalk'
import consola from 'consola'
import del from 'del'
import 'jake'
import makeDir from 'make-dir'
import path from 'path'
import { $, cd } from 'zx'
import {
  CRYPTO_MONOREPO_ROOT,
  IROHA_CRYPTO_TARGETS,
  // JS_TRANSFORM_TARGETS,
  WASM_PACK_CRATE_DIR,
  // WASM_PACK_OUT_DIR,
  WASM_PACK_OUT_NAME,
  // targetDirDist,
  // targetDirDistWasm,
  toWasmPackTarget,
  WASM_PACK_TARGETS,
  wasmPackOutDirForTarget,
  irohaCryptoTargetPackageRoot,
} from './meta'

import { build } from 'esbuild'

async function preserveCwd<T>(fn: () => Promise<T>): Promise<T> {
  const preserved = process.cwd()
  try {
    const ret = await fn()
    return ret
  } finally {
    cd(preserved)
  }
}

// async function findWasmPackArtifactsInDir(dir: string): Promise<string[]> {
//     const items = await Promise.all(
//         [`${WASM_PACK_OUT_NAME}_bg*`, `${WASM_PACK_OUT_NAME}.*`].map((x) => path.join(dir, x)).map((x) => glob(x)),
//     )
//     return items.flat()
// }
//
// task('clean-wasm', async () => {
//     for (const target of CRYPTO_TARGETS) {
//         const dir = targetDirDistWasm(target)
//         await del(dir)
//     }
// })
//
// task('clean-entries', async () => {
//     function* cleanTargets() {
//         for (const target of JS_TRANSFORM_TARGETS) {
//             yield path.join(targetDirDist(target), 'index.{d.ts,cjs,mjs}')
//         }
//     }
//
//     await del([...cleanTargets()])
// })
//
// desc('Clean entries & WASMs')
// task('clean', ['clean-wasm', 'clean-entries'])
//
// desc('Clean & build WASMs')
// task('build-wasm', ['clean-wasm'], async () => {
//     cd(WASM_PACK_CRATE_DIR)
//
//     for (const target of CRYPTO_TARGETS) {
//         consola.info(chalk`Building {blue.bold ${target}}`)
//
//         await del(WASM_PACK_OUT_DIR)
//         await $`wasm-pack build \\
//               --target ${toWasmPackTarget(target)} \\
//               --out-dir ${WASM_PACK_OUT_DIR} \\
//               --out-name ${WASM_PACK_OUT_NAME}
//     `
//
//         const dir = targetDirDistWasm(target)
//         await makeDir(dir)
//         await $`cp ${await findWasmPackArtifactsInDir(WASM_PACK_OUT_DIR)} ${dir}`
//
//         consola.success(chalk`Built: {green.bold ${target}}`)
//     }
//
//     cd(CRYPTO_MONOREPO_ROOT)
//     consola.success('WASMs are built!')
// })
//
// task('entries-js-transform', async () => {
//     for (const target of JS_TRANSFORM_TARGETS) {
//         const dist = targetDirDist(target)
//
//         const buildTarget = (format: 'cjs' | 'esm') =>
//             build({
//                 entryPoints: [path.join(dist, 'index.ts')],
//                 outfile: path.join(dist, 'index' + (format === 'cjs' ? '.cjs' : '.mjs')),
//                 format,
//                 logLevel: 'info',
//             })
//
//         // if (target === 'node') {
//         //   await buildTarget('cjs')
//         //   await buildTarget('esm')
//         // } else {
//         //   buildTarget('esm')
//         // }
//
//         buildTarget('esm')
//     }
// })
//
// task('entries-dts', async () => {
//     await $`pnpm build:entries:dts`
// })
//
// desc('Build entries')
// task('build-entries', ['clean-entries', 'entries-dts', 'entries-js-transform'])
//
// desc('Clean & build WASMs, then clean & build .d.ts & .js entries')
// task('build', ['clean', 'build-wasm', 'build-entries'])

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
    const dists = IROHA_CRYPTO_TARGETS.map((a) => irohaCryptoTargetPackageRoot(a).dist)
    consola.info(
      'Cleaning:\n' +
      dists
        .map((a) => path.relative(CRYPTO_MONOREPO_ROOT, a))
        .map((a) => `  ` + chalk.red(a))
        .join('\n'),
    )
    await del(dists)
  })

  task('all', async () => {
    await $`pnpm rollup -c`
  })
})

desc('Build wasm-pack for each target with only necessary artifacts needed for rolling up packages on top of it')
task('build-wasm-pkgs', ['wasm:clean', 'wasm:build-targets', 'wasm:keep-only-necessary'])

desc('Rollup packages on top of wasm-pack artifacts')
task('rollup', ['rollup:clean', 'rollup:all'])
