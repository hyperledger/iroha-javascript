import path from 'path'

export const CRYPTO_MONOREPO_ROOT = path.resolve(__dirname, '../')

const resolveRelativeToCryptoMonorepoRoot = (...paths: string[]) => path.resolve(CRYPTO_MONOREPO_ROOT, ...paths)

export const IROHA_CRYPTO_TARGETS = ['web', 'node', 'bundler'] as const

export type IrohaCryptoTarget = typeof IROHA_CRYPTO_TARGETS[number]


export const WASM_PACK_TARGETS = ['web', 'nodejs', 'bundler'] as const

export type WasmPackTarget = typeof WASM_PACK_TARGETS[number]

export function toWasmPackTarget(target: IrohaCryptoTarget): WasmPackTarget {
    if (target === 'node') return 'nodejs'
    return target
}

export const WASM_PACK_CRATE_DIR = resolveRelativeToCryptoMonorepoRoot('crypto-rs')

export function wasmPackOutDirForTarget(target: WasmPackTarget): string {
    return path.resolve(WASM_PACK_CRATE_DIR, `wasm-pkg-${target}`)
}

// export const WASM_PACK_OUT_DIR = resolve(WASM_PACK_CRATE_DIR, '.tmp-pkg')

export const WASM_PACK_OUT_NAME = 'iroha_crypto'

export const WASM_PKG_ROLLUP_ID = `~wasm-pkg`

export function irohaCryptoTargetPackageRoot(target: IrohaCryptoTarget): {  root: string, dist: string  } {
    const root = resolveRelativeToCryptoMonorepoRoot(`packages/target-${target}`)
    const dist = path.join(root, 'dist')
    return { root, dist }
}


// export function targetDirDistWasm(target: IrohaCryptoTarget): string {
//     return resolve(targetDirDist(target), 'wasm')
// }
