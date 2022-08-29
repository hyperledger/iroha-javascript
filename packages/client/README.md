# `@iroha2/client`

Client for Iroha 2, which is used to submit requests to Iroha peer.

## Versioning

| Iroha                                                           | This package       |
| --------------------------------------------------------------- | ------------------ |
| 2.0.0-pre-rc.6-lts (`75da907f66d5270f407a50e06bc76cec41d3d409`) | `~1.4.0`, `~2.0.0` |
| 2.0.0-pre-rc.5 (`43be45fc7fb7b0bd73f87b4fef167d61680c8e1e`)     | `1.3.0`            |
| 2.0.0-pre-rc.4 (`d00e0a9172d2a887a97f504796db5f2e05939c10`)     | `1.2.0`            |
| 2.0.0-pre-rc.3 (`8d83a3eff33f29b49004a0a5efe643b10f0f256e`)     | `1.1.0`            |
| 2.0.0-pre-rc.2 (`920e4d12754b0f3bf08cbaa5221d91c27863fcdc`)     | `1.0.0`            |
| 2.0.0-pre-rc.1                                                  | `0.4.1`            |

## Installation

The packages are published under the `@iroha2` scope into Iroha Nexus Registry.
To install `client` with `npm`/`pnpm`:

1. Configure your package manager to fetch scoped packages from Nexus Registry.

   ```ini
   # FILE: .npmrc
   @iroha2:registry=https://nexus.iroha.tech/repository/npm-group/
   ```

2. Install the `client` package:

   ```shell
   npm i @iroha2/client
   ```

## Isomorphic transports

Iroha Client uses WebSocket and HTTP to communicate with an Iroha Peer. There is no way for Iroha Client to communicate with a peer in an environment-agnostic way.

Previously, `@iroha2/client` used `@iroha2/client-isomorphic-ws` and `@iroha2/client-isomorphic-fetch` to seamlessly switch between environment-specific transports. Due to Node.js moving towards ESM, the way isomorphism used to be achieved is no longer applicable, and these packages are no longer in use.

Now the client provides additional entrypoints for isomorphic adapters, the same way it is done in [isomorphic-git](https://github.com/isomorphic-git/isomorphic-git/tree/main#getting-started). You need to provide `fetch`/`ws` yourself.

### WebSocket

For WebSocket, the client has two entrypoints: `@iroha2/client/web-socket/native` and `@iroha2/client/web-socket/node`.

1. Import adapters:

   Import `@iroha2/client/web-socket/native` for when the native `WebSocket` exists:

   ```ts
   import { adapter } from '@iroha2/client/web-socket/native'
   ```

   Import `@iroha2/client/web-socket/node` with the `ws` package for Node.js:

   ```ts
   import { adapter } from '@iroha2/client/web-socket/node'
   ```

2. Inject WebSocket adapter into Iroha Client:

   ```ts
   new Client({ ws: adapter })
   ```

### Fetch

`fetch` could be provided in the same way. However, `@iroha2/client` does not provide it itself. There are `node-fetch` and `undici` packages that provide the `fetch` implementation that could be injected into Iroha Client.

1. Import fetch from `node-fetch` **or** `undici` packages:

   ```ts
   import { fetch } from 'undici'
   import fetch from 'node-fetch'
   ```

2. Inject `fetch` into Iroha Client:

   ```ts
   new Client({ fetch })
   ```

## Client Configuration

Refer to Iroha 2 tutorial for instructions on how to [configure the client](https://hyperledger.github.io/iroha-2-docs/guide/javascript.html#_2-client-configuration).
