# Intro

::: warning
`@iroha2/*` packages are currently in 0.x status, so the API could (and will) change.
:::

## Prerequisites

Setup NPM registry correctly to install packages:

```ini
# .npmrc
@iroha2:registry=https://nexus.iroha.tech/repository/npm-group/
```

Then you can install `@iroha2/*`:

```shell
npm i @iroha2/client
```

## Packages

### Data Model

-   Package name: `@iroha2/data-model`

Contains generated data-model helpers to perform encoding & decoding between JS and SCALE codec spec.

See also: [SCALE-js docs](https://soramitsu.github.io/scale-codec-js-library/).

### Core crypto package

-   Package name: `@iroha2/crypto-core`

Contains **types** for unified crypto interface.

### Target-specific crypto packages

-   Package names: `@iroha2/crypto-target-{web,node,bundler}`

Each package contains target-specific compiled WASM and exports an implementation of the unified crypto interface with from `@iroha2/crypto-core`. See each package doc about its usage details.

### Client

-   Package name: `@iroha2/client`

The API layer between Iroha v2 Peer and JS. It is mostly built on top of `@iroha2/data-model` and requires crypto injection.
