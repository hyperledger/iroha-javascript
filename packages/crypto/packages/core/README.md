# `@iroha2/crypto-core`

The `@iroha2/crypto-core` package contains the unified crypto interface for Iroha 2 Javascript.
Compiled implementations for each target (`node`, `web`, `bundler`) are in their own packages:

- [`@iroha2/crypto-target-node`](../target-node/)
- [`@iroha2/crypto-target-web`](../target-web/)
- [`@iroha2/crypto-target-bundler`](../target-bundler/)

You can learn more about targets in the [`wasm-bindgen` documentation](https://rustwasm.github.io/docs/wasm-bindgen/reference/deployment.html).

## Installation

The packages are published under the `@iroha2` scope into Iroha Nexus Registry.
To install the necessary packages with `npm`/`pnpm`:

1. Configure your package manager to fetch scoped packages from Nexus Registry.

    ```ini
    # FILE: .npmrc
    @iroha2:registry=https://nexus.iroha.tech/repository/npm-group/
    ```

2. Install the packages you need:

    ```shell
    pnpm add @iroha2/crypto-core @iroha2/crypto-target-node
    ```

## Development

To develop environment-agnostic libraries that would depend on Iroha Crypto, you have to use dependency-inversion strategy. This means making your library depend on the `IrohaCryptoInterface` interface instead of a particular implementation of it.

For example:

```ts
import { IrohaCryptoInterface } from '@iroha2/crypto-core';

interface MyEmailHashingLibrary {
    hash(email: string): Uint8Array;
}

function encodeString(str: string): Uint8Array {
    /* making utf-8 magic... */
}

/**
 * Injecting crypto in runtime as an argument
 */
export function createEmailHashing(crypto: IrohaCryptoInterface): MyEmailHashingLibrary {
    return {
        hash(email) {
            // and using crypto
            const hash = crypto.createHash(encodeString(email));
            const bytes = hash.bytes();
            // also don't forget to `free` structures from the wasm to avoid memory leaks!
            hash.free();
            return bytes;
        },
    };
}
```
