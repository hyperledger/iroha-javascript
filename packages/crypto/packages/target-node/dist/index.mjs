import { createRequire } from 'module'
const wasm = createRequire(import.meta.url)('./wasm/crypto')
const crypto = wasm;
export {
  crypto
};
