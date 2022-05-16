import consola from 'consola'
import makeDir from 'make-dir'
import { $, cd, glob, path } from 'zx'

const CRATE_ROOT_DIR = path.resolve(__dirname, '../crypto-rs/iroha_crypto_wasm')
const BUILD_TMP_DIR = path.resolve(CRATE_ROOT_DIR, '.tmp-pkg')
const BUILD_OUT_NAME = 'wasm_pack_output'

function computeDistForTarget(targetName: string): string {
  return path.resolve(__dirname, `../packages/target-${targetName}`)
}

async function necessaryArtifacts(outName: string): Promise<string[]> {
  const items = await Promise.all(
    [`${outName}_bg*`, `${outName}.*`].map((x) => path.join(BUILD_TMP_DIR, x)).map((x) => glob(x)),
  )
  return items.flat()
}

export async function build_wasm() {
  interface BuildConfig {
    target: string
    distDir: string
  }

  const configs: BuildConfig[] = [
    { target: 'web', distDir: computeDistForTarget('web') },
    { target: 'nodejs', distDir: computeDistForTarget('node') },
    { target: 'bundler', distDir: computeDistForTarget('bundler') },
  ]

  for (const config of configs) {
    consola.info('Building', config.target)

    cd(CRATE_ROOT_DIR)
    await $`wasm-pack build \\
            --target ${config.target} \\
            --out-dir ${BUILD_TMP_DIR} \\
            --out-name ${BUILD_OUT_NAME}
        `

    const dist = config.distDir
    await makeDir(dist)

    cd(BUILD_TMP_DIR)
    await $`cp ${await necessaryArtifacts(BUILD_OUT_NAME)} ${dist}`
  }

  consola.success('Done!')
}
