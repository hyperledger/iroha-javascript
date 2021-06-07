# @iroha/data-model

This package contains generated types and definitions of Iroha Data Model.

### Usage

> This package exposes raw typescript code so transpilation and launch is delegated to upstream packages.

```ts
import {
    // import any type or interface that you need
    Id,
    PublicKey,
    Hash,
    Account,

    // definitions for TypeRegistry
    runtimeDefinitions,

    // Types summary of `runtimeDefininitions` to use it with helpers,
    IrohaDslConstructorDef,
} from '@iroha/data-model';

import { TypeRegistry, DEFAULT_CODECS, createHelpers } from '@iroha/scale-codec-legacy';

const registry = new TypeRegistry();
registry.register(DEFAULT_CODECS);
registry.register(runtimeDefinitions);

const helpers = createHelpers<
    // this is necessary
    typeof DEFAULT_CODECS & IrohaDslConstructorDef
>({ runtime: registry });
```

### Regenerate schema

To regenerate schema with new JSON-data from Rust code, put new data to `./src/input.json` and run:

```ts
pnpm gen
```

After this `./src/types.ts` and `./src/definitions.json` will be updated. You should commit changes after all.
