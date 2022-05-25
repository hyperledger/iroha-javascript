---
'@iroha2/crypto-target-bundler': minor
'@iroha2/crypto-target-node': minor
'@iroha2/crypto-target-web': minor
---

**BREAKING:**

- Package contents are moved to `dist` directory;
- Compiled WASM is moved to `dist/wasm` directory.
- Compiled WASM is renamed to `crypto` (from `wasm_pack_output`)

**How to migrate:**

- If you have imported WASMs like this:

  ```ts
  import rawWasm from '@iroha2/crypto-target-*/wasm_pack_output_bg.wasm'
  ```

  then now you should change import path:

  ```ts
  import rawWasm from '@iroha2/crypto-target-*/dist/wasm/crypto_bg.wasm'
  ```
