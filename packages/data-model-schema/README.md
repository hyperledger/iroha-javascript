# `@iroha2/data-model-schema`

The `@iroha2/data-model-schema` contains the source data model schema of Iroha 2 and its type definitions.

**Note:** this package is a pure TypeScript package, i.e. it is not pre-bundled, but it exports source TypeScript files. It works fine out-of-the-box with tools like Vite or `tsx`.

## Target version

This version of package targets [Iroha `2.0.0-pre-rc.20`](https://github.com/hyperledger/iroha/tree/51d687607fad067fc855e266edc684d4fb33e7de).

## Usage

```ts
import { SCHEMA, type Schema } from '@iroha2/data-model-schema'
```

where:

- `SCHEMA` is the original JSON of the data model schema
- `type Schema` is a generalised type definition which applies to `SCHEMA`

## Installation

The packages are published under the `@iroha2` scope into Iroha Nexus Registry.
To install `data-model-schema` with `npm`/`pnpm`:

1. Configure your package manager to fetch scoped packages from Nexus Registry.

   ```ini
   # FILE: .npmrc
   @iroha2:registry=https://nexus.iroha.tech/repository/npm-group/
   ```

2. Install the `data-model-schema` package:

   ```shell
   npm i @iroha2/data-model-schema
   ```
