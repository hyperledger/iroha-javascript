# @iroha/data-model

This package contains generated types and definitions of Iroha Data Model.

### Usage

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

Idea is to put Rust schema's JSON to `./src/input.json` and run `pnpm gen` here to regenerate types (`./src/types.ts`) & definitions (`./src/definitions.json`). That's all.
