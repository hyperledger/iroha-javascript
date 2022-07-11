# `@iroha2/client`

Client for Iroha 2, which is used to submit requests to Iroha peer.

## Versioning

| Iroha                                                           | This package |
| --------------------------------------------------------------- | ------------ |
| 2.0.0-pre-rc.6-lts (`75da907f66d5270f407a50e06bc76cec41d3d409`) | `1.4.0`      |
| 2.0.0-pre-rc.5 (`43be45fc7fb7b0bd73f87b4fef167d61680c8e1e`)     | `1.3.0`      |
| 2.0.0-pre-rc.4 (`d00e0a9172d2a887a97f504796db5f2e05939c10`)     | `1.2.0`      |
| 2.0.0-pre-rc.3 (`8d83a3eff33f29b49004a0a5efe643b10f0f256e`)     | `1.1.0`      |
| 2.0.0-pre-rc.2 (`920e4d12754b0f3bf08cbaa5221d91c27863fcdc`)     | `1.0.0`      |
| 2.0.0-pre-rc.1                                                  | `0.4.1`      |

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

## Client Configuration

Refer to Iroha 2 tutorial for instructions on how to [configure the client](https://hyperledger.github.io/iroha-2-docs/guide/javascript.html#_2-client-configuration).
