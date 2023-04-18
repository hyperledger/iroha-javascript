# `@iroha2/data-model`

The `@iroha2/data-model` packages contains generated SCALE-definitions for Iroha 2 Data Model.

## Target version

This version of package targets Iroha `v2.0.0-pre-rc.14` (internal release, reference hash: `726f5eabf65a79ea618b4fce62a09cee7a5b13d1`).

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
