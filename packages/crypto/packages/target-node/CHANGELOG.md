# @iroha2/crypto-target-node

## 0.3.0

### Minor Changes

- a99d219: **fix!**: define `exports` field; use `*.cjs` extension for `require()` imports and `*.mjs` for `import`

## 0.2.0

### Minor Changes

- 6f6163f: **BREAKING:**

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

### Patch Changes

- 49c8451: fix: make `@iroha2/crypto-core` a prod dependency, not a dev
- 6f6163f: rebuild WASM
- 49c8451: chore: include only necessary files into `files` field in the `package.json`
- Updated dependencies [49c8451]
  - @iroha2/crypto-core@0.1.1

## 0.1.1

### Patch Changes

- 98d3638: recompile wasms
