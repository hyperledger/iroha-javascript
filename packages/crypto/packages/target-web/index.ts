import { IrohaCryptoInterface } from '@iroha2/crypto-core';
import * as wasm from './wasm_pack_output';
export const crypto: IrohaCryptoInterface = wasm;
export { default as init } from './wasm_pack_output';
