# @iroha2/crypto-core

Core Iroha v2 JS Crypto package. Contains unified crypto interface. Compiled implementations for each target are in their own packages, accordingly:

-   `@iroha2/crypto-target-node`
-   `@iroha2/crypto-target-web`
-   `@iroha2/crypto-target-bundler`

More about targets in [the `wasm-bindgen`'s docs](https://rustwasm.github.io/docs/wasm-bindgen/reference/deployment.html).

## Installation

```ini
# .npmrc
@iroha2:registry=https://nexus.iroha.tech/repository/npm-group/
```

```shell
# install necessary packages
pnpm add @iroha2/crypto-core @iroha2/crypto-target-node
```

## How to develop libraries that would depend on Iroha Crypto?

There is the only way (as I see it) now to develop a library that will be environment-agnostic. You have to use dependency-inversion strategy - make your library depend on the interface `IrohaCryptoInterface` instead of a particular implementation. For example:

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
