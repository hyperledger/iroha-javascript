# `@iroha2/crypto-interface-wrap`

This package contains the target-agnostic wrapper code around the WASM bindings produced by `wasm-bindgen`. The package is not intended for publication, but for including it into other packages.

## Magic target import

In order for the wrapper code to be target-agnostic, it uses the virtual import which then is replaced in Rollup when the particular target wrapper is built:

```ts
import { wasmPkg } from '@iroha2/crypto-interface-wrap/~wasm-pack-proxy'
```

For development, on type-level mode it is replaced with the types from `wasm-pkg-nodejs` (it doesn't matter which target is used for it) - see [here, how](./src/wasm-pack-proxy-shim.d.ts). In Rollup it is replaced with a particular target:

```ts
// @iroha2/crypto-interface-wrap/~wasm-pack-proxy
export * as wasmPkg from 'crypto-rs/wasm-pkg-nodejs/iroha_crypto'
```

Accessing the target code via namespace import (`* as wasmPkg`) in necessary for Rollup to be able to build the code both for CJS and ESM targets.

## Specifying dependencies

This package is included into other package's **dev** dependencies. `@iroha2/data-model` & `@iroha2/crypto-core` are included into other package's **prod** dependencies, because they are used in the wrapper source code. Actually, this package imports `@iroha2/crypto-util`, but in Rollup it is replaced with `@iroha2/crypto-core`, since the latter re-exports the util package.

## How this package is used

See the source code of `crypto-target-*` and `crypto-core` packages.
