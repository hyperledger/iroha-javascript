# `@iroha2/monorepo-crypto`

## Contents

The directory contains the following packages:

- [`crypto-core`](./packages/core/) provides the types and re-exports from `crypto-util`
- [`crypto-util`](./packages/util/) provides the shared utilities
- [`crypto-target-node`](./packages/target-node/) provides compiled crypto WASM for the Node.js environment
- [`crypto-target-web`](./packages/target-web/) provides compiled crypto WASM for native Web (ESM)
- [`crypto-target-bundler`](./packages/target-bundler/) provides compiled crypto WASM to use with bundlers such as
  Webpack
