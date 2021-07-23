# @iroha/data-model

Generated SCALE-definitions for Iroha Data Model

### Usage

```ts
import { types, IrohaTypes } from '@iroha/data-model`

const assetDefinitionId: IrohaTypes['iroha_data_model::asset::DefinitionId'] = {
    name: 'Alice',
    domainName: 'Wonderland'
};

const encoded = types.encode('iroha_data_model::asset::DefinitionId', assedDefinitionId);
const decoded = types.decode('iroha_data_model::asset::DefinitionId', encoded);
```

### Regenerate schema

Source data for generation - `input/input.json`. You can update it manually, or automatically with command:

```
# Install
pnpm update-json
```

**This script requires Rust and Cargo installed!**

Then you could regenerate namespace definition with command:

```
pnpm gen
```

After this, check newly generated `src/generated.ts` file and prettify it. That's all.
