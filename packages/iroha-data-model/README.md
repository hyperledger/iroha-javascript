# @iroha2/data-model

Generated SCALE-definitions for Iroha Data Model

## Installation

Configure your package manager to fetch scoped packages from nexus. Example for `npm`/`pnpm` - file `.npmrc`:

```ini
# .npmrc
@iroha2:registry=https://nexus.iroha.tech/repository/npm-group/
```

Then, install packages:

```sh
npm i @iroha2/data-model
```

### Usage

```ts
import { irohaCodec, IrohaDataModel } from '@iroha2/data-model`

const assetDefinitionId: IrohaDataModel['iroha_data_model::asset::DefinitionId'] = {
    name: 'Alice',
    domainName: 'Wonderland'
};

const encoded = irohaCodec.encode('iroha_data_model::asset::DefinitionId', assedDefinitionId);
const decoded = irohaCodec.decode('iroha_data_model::asset::DefinitionId', encoded);
```

> For 64 and 128-bits integers `jsbi` library is used. It is a dependency of `@scale-codec/core` package and re-exported by the chain of packages, so you can use it directly with `import { JSBI } from '@iroha2/data-model'`. For related docs, see [JSBI docs](https://www.npmjs.com/package/jsbi).

### Regenerate schema

Source data for generation - `input/input.json`. You can update it manually, or automatically with command:

```
# Install
pnpm update-json
```

**This script requires Rust and Cargo installed!**

**TODO**: load schema from `hyperledger/iroha` actions artifacts.

Then you could regenerate namespace definition with command:

```
pnpm gen
```

After this, check newly generated `src/generated.ts` file and prettify it. That's all.
