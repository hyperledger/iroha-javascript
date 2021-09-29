# @iroha2/crypto

Iroha's cryptography wrapped into WASM.

## Installation

Configure your package manager to fetch scoped packages from nexus. Example for `npm`/`pnpm` - file `.npmrc`:

```ini
# .npmrc
@iroha2:registry=https://nexus.iroha.tech/repository/npm-group/
```

And then install the package:

```sh
npm i @iroha2/crypto
```

## Usage

There are 4 entrypoints in this package:

-   `@iroha2/crypto/web` for usage in Web (requires pre-initialization)
-   `@iroha2/crypto/node` for usage in the NodeJS env
-   `@iroha2/crypto/bundler` for usage with Webpack
-   `@iroha2/crypto/types` for types; convenient for libraries development (e.g. for the client lib). **It is pure types (d.ts) file and doesn't contain any runtime stuff**.

> If you want to know more details about targets and their differences, read [the `wasm-bindgen`'s docs](https://rustwasm.github.io/docs/wasm-bindgen/reference/deployment.html).

```ts
// import crypto interface relatively to the enviroment
import { crypto } from '@iroha2/crypto/node';
import { crypto } from '@iroha2/crypto/web';
import { crypto } from '@iroha2/crypto/bundler';

// import pure types for development
import { IrohaCryptoInterface, KeyPair /* etc */ } from '@iroha2/crypto/types';
```

`crypto` here is an `IrohaCryptoInterface`-object.

**Please note** that in web env it requires pre-initialization:

```ts
import { init, crypto } from '@iroha2/crypto/web';

init().then(() => {
    // now you can use crypto
    crypto.createHash(new Uint8Array([1, 2, 3]));
});
```

## How to develop libraries that would depend on Iroha Crypto?

There is the only way (as I see it) now to develop a library that will be environment-agnostic. You have to use dependency-inversion strategy - make your library depend on the interface `IrohaCryptoInterface` instead of a particular implementation. For example:

```ts
import { IrohaCryptoInterface } from '@iroha2/crypto/types';

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

## Detailed documentation about library exports

TODO

## Why so ugly usage interface?

Because of restriction of WASM approach. Internally it uses Rust and [`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/introduction.html) and its build output depends on the target enviroment.

## Notes for future developers

I want to make a note about building of `types.d.ts`. It works in a circular way: firstly I built a web wasm with `wasm-pack`, then I created it exports with `input-for-rollup-dts.d.ts` and then I bundled it with Rollup and `rollup-plugin-dts` into the `types.d.ts` file that looks like it is undependent from any bundles. And it is a right way - these types are primary and implementations are secondary. To ensure that implementations follow these types there is a special test package in `test/interfaces` that just type-checks that everything is ok. Btw, if you will need to rebuild `types.d.ts` in the same way you could do it easy with `pnpm rollup-types` command.
