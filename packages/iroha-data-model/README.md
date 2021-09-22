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
npm i @iroha2/data-model jsbi
```

> `jsbi` is a peer dependency of `@scale-codec/*` packages

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
