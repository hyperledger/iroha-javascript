# Iroha2 JavaScript

JavaScript SDK for [Iroha 2](https://github.com/hyperledger/iroha/tree/iroha2/).

The Iroha 2 JavaScript library includes the following packages:

- [`@iroha2/client`](./packages/client/) submits requests to the Iroha peer
- [`@iroha2/crypto-*`](./packages/crypto/):
  - [`@iroha2/crypto-core`](./packages/crypto/packages/core/) provides unified crypto interface for Iroha 2
  - [`@iroha2/crypto-target-node`](./packages/crypto/packages/target-node/) provides compiled crypto WASM for the Node.js environment
  - [`@iroha2/crypto-target-web`](./packages/crypto/packages/target-web/) provides compiled crypto WASM for native Web (ESM)
  - [`@iroha2/crypto-target-bundler`](./packages/crypto/packages/target-bundler/) provides compiled crypto WASM to use with bundlers such as Webpack
- [`@iroha2/data-model`](./packages/data-model/) provides SCALE codecs for Iroha 2 data model
  
Other packages you can find in this repository:
- [`@iroha2/client-isomorphic-fetch`](./packages/client-isomorphic-fetch/) fallbacks to `node-fetch` or native `fetch()` in Node.js
- [`@iroha2/client-isomorphic-ws`](./packages/client-isomorphic-ws/) contains isomorphic WebSocket transport for `@iroha2/client`
- [`@iroha2/docs-recipes`](./packages/docs-recipes/) contains code samples used in documentation
- [`@iroha2/data-model-schema`](./packages/data-model-schema/) contains Iroha 2 Schema
- [`@iroha2/i64-fixnum`](./packages/i64-fixnum/) handles operations with fixed-point numbers

 
## Installation

The packages are published under the `@iroha2` scope into Iroha Nexus Registry. To install them using `npm`/`pnpm`, follow these steps:

1. Configure your package manager to fetch scoped packages from Nexus Registry:

    ```ini
    # FILE: .npmrc
    @iroha2:registry=https://nexus.iroha.tech/repository/npm-group/
    ```

2. Install these packages as any other NPM package:

    ```shell
    npm i @iroha2/client
    yarn add @iroha2/data-model
    pnpm add @iroha2/crypto-target-web
    ```

## Get Started

Check out [Hyperledger Iroha 2 Tutorial](https://hyperledger.github.io/iroha-2-docs/) that introduces you to Iroha 2 concepts and features and provides you with a step-by-step guide for JavaScript/TypeScript.

## Explore Jake tasks

```bash
pnpm jake -t
```
