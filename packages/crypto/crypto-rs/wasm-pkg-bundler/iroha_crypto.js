import * as wasm from "./iroha_crypto_bg.wasm";
import { __wbg_set_wasm } from "./iroha_crypto_bg.js";
__wbg_set_wasm(wasm);
export * from "./iroha_crypto_bg.js";

wasm.__wbindgen_start();
