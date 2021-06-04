# @iroha/scale-codec-legacy

> This is the re-worked `@polkadot/types` package. Removed unnecessary, left only necessary for encoding and decoding. Helpers have also been added. More details below.

Implementation of the types and their (de-)serialisation via SCALE codec. On the Rust side, the codec types and primitive types are implemented via the [parity-codec](https://github.com/paritytech/parity-codec).

### Installation

```
pnpm add @iroha/scale-codec-legacy
```

Before usage, make sure that you **builded** this package via the command:

```sh
pnpm build --filter @iroha/scale-codec-legacy
```

> Build is necessary and includes NodeJS polyfills for browser (specially to support `Buffer`, which is used directly in `@polkadot/types`).

### Usage

```ts
import { DEFAULT_CODECS, TypeRegistry, createHelpers } from '@iroha/scale-codec-legacy';

// Create a runtime types registry
const registry = new TypeRegistry();

// register necessary types (constructors | definitions)
registry.register(DEFAULT_CODECS);

// create helpers (if you want TypeScript hints)
const { createScale } = createHelpers<typeof DEFAULT_CODECS>({ runtime: registry });

// and now you can create codec types from buffers or from javascript values
const textEncoded = createScale('Text', 'some text data').toU8a();
const textDecoded = createScale('Text', textEncoded);
```

You may extends definitions with your own:

```ts
import { Text, Struct } from '@iroha/scale-codec-legacy';

const definitions = {
    Id: {
        name: 'Text',
        domain: 'Text',
    },
};

interface Id extends Struct {
    name: Text;
    domain: Text;
}

const registry = new TypeRegistry();
registry.register(DEFAULT_CODECS);
registry.register(definitions);

createHelpers<typeof DEFAULT_CODECS & { Id: Id }>({ runtime: registry });
```

> Definitions defining boilerplate is done with `@iroha/scale-codec-legacy-typegen` package.
