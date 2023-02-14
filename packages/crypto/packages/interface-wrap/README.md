# `@iroha2/crypto-interface-wrap`

This package contains the target-agnostic wrapper code around the WASM bindings produced by `wasm-bindgen`. The package is intended not for publication but to be included in other packages.

## Magic target import

In order for the wrapper code to be target-agnostic, it uses the virtual import, which is then replaced in Rollup when the particular target wrapper is built:

```ts
import { wasmPkg } from '@iroha2/crypto-interface-wrap/~wasm-pack-proxy'
```

For development, on type-level mode it is [replaced](./src/wasm-pack-proxy-shim.d.ts) with the types from `wasm-pkg-nodejs` (it doesn't matter which target is used for it). In Rollup, it is replaced with a particular target:

```ts
// @iroha2/crypto-interface-wrap/~wasm-pack-proxy
export * as wasmPkg from 'crypto-rs/wasm-pkg-nodejs/iroha_crypto'
```

Accessing the target code via namespace import (`* as wasmPkg`) is necessary for Rollup to build the code both for CJS and ESM targets.

## Specifying dependencies

This package is included into other package's **dev** dependencies. `@iroha2/data-model` and `@iroha2/crypto-core` are included into other package's **prod** dependencies because they are used in the wrapper source code.

Under the hood, this package imports `@iroha2/crypto-util`, which is then replaced with `@iroha2/crypto-core` in Rollup since the latter re-exports the util package.

## How this package is used

See the source code of `crypto-target-*` and `crypto-core` packages.
