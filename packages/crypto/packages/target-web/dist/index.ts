import { IrohaCryptoInterface } from '@iroha2/crypto-core'
import * as wasm from './wasm/crypto'
export const crypto: IrohaCryptoInterface = wasm
export { default as init } from './wasm/crypto'
