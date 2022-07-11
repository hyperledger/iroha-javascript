# `@iroha2/monorepo-crypto`

The `@iroha2/monorepo-crypto` package is a service package to handle everything related to crypto.

## Contents

The package contains the following packages:
- [crypto-core](./packages/crypto/core/)  provides unified crypto interface for Iroha 2 (`IrohaCryptoInterface`)
- [crypto-target-node](./packages/crypto/target-node/) provides compiled crypto WASM for the Node.js environment
- [crypto-target-web](./packages/crypto/target-web/) provides compiled crypto WASM for native Web (ESM)
- [crypto-target-bundler](./packages/crypto/target-bundler/) provides compiled crypto WASM to use with bundlers such as Webpack

## Tasks

Explore Jake tasks

```bash
pnpm jake -t
```
