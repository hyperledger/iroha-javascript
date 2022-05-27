import path from 'path'

export const CRYPTO_MONOREPO_ROOT = path.resolve(__dirname, '../')

const resolve = (...paths: string[]) => path.resolve(CRYPTO_MONOREPO_ROOT, ...paths)

export const CRYPTO_TARGETS = ['web', 'node', 'bundler'] as const

export type CryptoTarget = typeof CRYPTO_TARGETS[number]

export const WASM_PACK_TARGETS = ['web', 'nodejs', 'bundler'] as const

export type WasmPackTarget = typeof WASM_PACK_TARGETS[number]

export function toWasmPackTarget(target: CryptoTarget): WasmPackTarget {
  if (target === 'node') return 'nodejs'
  return target
}

export const WASM_PACK_CRATE_DIR = resolve('crypto-rs/iroha_crypto_wasm')

export const WASM_PACK_OUT_DIR = resolve(WASM_PACK_CRATE_DIR, '.tmp-pkg')

export const WASM_PACK_OUT_NAME = 'crypto'

export function targetDir(target: CryptoTarget): string {
  return resolve(`packages/target-${target}`)
}

export function targetDirDist(target: CryptoTarget): string {
  return resolve(targetDir(target), 'dist')
}

export function targetDirDistWasm(target: CryptoTarget): string {
  return resolve(targetDirDist(target), 'wasm')
}
