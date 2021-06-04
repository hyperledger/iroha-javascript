# @iroha/crypto

This package contains tiny WASM-compiled `ursa` bindings.

```ts
export declare function create_blake2b_32_hash(bytes: Uint8Array): Uint8Array;

export declare function sign_with_ed25519_sha512(message: Uint8Array, private_key: Uint8Array): Uint8Array;
```

### Usage

Usage depends on the environment in which the package is being used.

In **Node.JS** you can simply import this functions and use them from the `@iroha/crypto/common`:

```js
const { create_blake2b_32_hash } = require('@iroha/crypto/common');

create_blake2b_32_hash(new UInt8Array([1, 2, 3]));
```

In **Web** you should initialize the WASM first (and import from `@iroha/crypto/esm`):

```js
import init, { create_blake2b_32_hash } from '@iroha/crypto/esm';

init().then((output) => {
    // now you can call imported functions
    create_blake2b_32_hash(new UInt8Array([1, 2, 3]));

    // or you can gen them from init() result
    output.create_blake2b_32_hash(new UInt8Array([1, 2, 3]));
});
```

> I think that this inconsistency should be fixed. BTW, all monorepo should be fixed, IMO.
