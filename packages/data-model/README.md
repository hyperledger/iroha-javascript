# `@iroha2/data-model`

The `@iroha2/data-model` packages contains generated SCALE-definitions for Iroha 2 Data Model.

## Versioning

| Iroha                                                       | This package |
| ----------------------------------------------------------- | ------------ |
| 2.0.0-pre-rc.4 (`d00e0a9172d2a887a97f504796db5f2e05939c10`) | `1.2.0`      |
| 2.0.0-pre-rc.3 (`8d83a3eff33f29b49004a0a5efe643b10f0f256e`) | `1.1.0`      |
| 2.0.0-pre-rc.2 (`920e4d12754b0f3bf08cbaa5221d91c27863fcdc`) | `1.0.0`      |
| 2.0.0-pre-rc.1                                              | `0.5.0`      |

## Installation

The packages are published under the `@iroha2` scope into Iroha Nexus Registry.
To install `data-model` with `npm`/`pnpm`:

1. Configure your package manager to fetch scoped packages from Nexus Registry.

    ```ini
    # FILE: .npmrc
    @iroha2:registry=https://nexus.iroha.tech/repository/npm-group/
    ```

2. Install the `data-model` package:

    ```bash
    npm i @iroha2/data-model
    ```

## Known issues

### Entries ordering in `BTreeMap` and `BTreeSet`

In Rust, these structs assume that items are `PartialOrd`-ordered while encoding to ensure consistency for signatures creation. The JS library doesn't provide this feature and you should put entries in the correct order by yourself.
