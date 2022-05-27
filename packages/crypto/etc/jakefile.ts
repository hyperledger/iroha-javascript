import chalk from 'chalk'
import consola from 'consola'
import del from 'del'
import 'jake'
import makeDir from 'make-dir'
import { $, cd, glob, path } from 'zx'
import {
  CRYPTO_MONOREPO_ROOT,
  CRYPTO_TARGETS,
  WASM_PACK_CRATE_DIR,
  WASM_PACK_OUT_DIR,
  WASM_PACK_OUT_NAME,
  targetDirDist,
  targetDirDistWasm,
  toWasmPackTarget,
} from './meta'
import { build } from 'esbuild'

async function findWasmPackArtifactsInDir(dir: string): Promise<string[]> {
  const items = await Promise.all(
    [`${WASM_PACK_OUT_NAME}_bg*`, `${WASM_PACK_OUT_NAME}.*`].map((x) => path.join(dir, x)).map((x) => glob(x)),
  )
  return items.flat()
}

task('clean-wasm', async () => {
  for (const target of CRYPTO_TARGETS) {
    const dir = targetDirDistWasm(target)
    await del(dir)
  }
})

task('clean-entries', async () => {
  function* cleanTargets() {
    for (const target of CRYPTO_TARGETS) {
      yield path.join(targetDirDist(target), 'index.{d.ts,js}')
    }
  }

  await del([...cleanTargets()])
})

desc('Clean entries & WASMs')
task('clean', ['clean-wasm', 'clean-entries'])

desc('Clean & build WASMs')
task('build-wasm', ['clean-wasm'], async () => {
  cd(WASM_PACK_CRATE_DIR)

  for (const target of CRYPTO_TARGETS) {
    consola.info(chalk`Building {blue.bold ${target}}`)

    await del(WASM_PACK_OUT_DIR)
    await $`wasm-pack build \\
              --target ${toWasmPackTarget(target)} \\
              --out-dir ${WASM_PACK_OUT_DIR} \\
              --out-name ${WASM_PACK_OUT_NAME}
    `

    const dir = targetDirDistWasm(target)
    await makeDir(dir)
    await $`cp ${await findWasmPackArtifactsInDir(WASM_PACK_OUT_DIR)} ${dir}`

    consola.success(chalk`Built: {green.bold ${target}}`)
  }

  cd(CRYPTO_MONOREPO_ROOT)
  consola.success('WASMs are built!')
})

task('entries-js-transform', async () => {
  for (const target of CRYPTO_TARGETS) {
    const dist = targetDirDist(target)

    await build({
      entryPoints: [path.join(dist, 'index.ts')],
      outfile: path.join(dist, 'index.js'),
      format: target === 'node' ? 'cjs' : 'esm',
      logLevel: 'info',
    })
  }
})

task('entries-dts', async () => {
  await $`pnpm build:entries:dts`
})

desc('Build entries')
task('build-entries', ['clean-entries', 'entries-dts', 'entries-js-transform'])

desc('Clean & build WASMs, then clean & build .d.ts & .js entries')
task('build', ['clean', 'build-wasm', 'build-entries'])
