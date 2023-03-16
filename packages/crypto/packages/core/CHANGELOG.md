# @iroha2/crypto-core

## 1.0.1

### Patch Changes

- Updated dependencies [d1e5f68]
- Updated dependencies [3ff768d]
- Updated dependencies [d1e5f68]
  - @iroha2/data-model@5.0.0

## 1.0.0

### Major Changes

- ddfeeac: **feature**: re-write WASM and provide high-level wrappers around it.

  #### What the braking change is

  Each target now provides high-level wrappers around raw `wasm-pack` artifacts. These wrappers provide a better-designed interface with features like global `.free()`-objects tracking and integration with `@iroha2/data-model`.

  Moreover, the WASM itself is re-written and now provides more flexibility, such as working with JSON and HEX representations out of the box.

  Here you can see how `@iroha2/crypto-core` and `@iroha2/crypto-target-*` are connected:

  ```ts
  import { IrohaCryptoInterface, cryptoTypes } from '@iroha2/crypto-core'
  import { crypto } from '@iroha2/crypto-target-node'

  // each target exports `crypto`, which is the `IrohaCryptoInterface` type from
  // the core library
  const cryptoAsserted: IrohaCryptoInterface = crypto

  // the core library exports `cryptoTypes` namespace which contains all the types
  // used in crypto you might need
  const hash: cryptoTypes.Hash = crypto.Hash.hash('hex', '00ff')
  ```

  `@iroha2/crypto-core` re-exports `@iroha2/crypto-util`, a new library which contains (for now) only utilities to work with `.free()` tracking:

  ```ts
  import { freeScope, FREE_HEAP } from '@iroha2/crypto-util'
  import { crypto } from '@iroha2/crypto-target-web'

  const keyPair = freeScope((scope) => {
    const pair = crypto.KeyGenConfiguration
      // Create a configuration object that you can later `.free()` manually.
      // It is automatically attached to the scope it is created within,
      // so when the scope is over, everything attached to it will be freed.
      .default()
      .useSeed('hex', 'ff')
      // Create a new `.free()` object: a key pair
      .generate()

    // to use the key pair (and nothing else) out of scope,
    // you need to "untrack" it
    scope.forget(pair)

    return pair
  })

  // inspect the heap in order to determine if there are memory leaks
  if (FREE_HEAP.size > 1) {
    console.log('Something went wrong, I guess?')
  }
  ```

  #### Why the change was made

  Codegen of `wasm_bindgen` is very limited. This change is made to provide a better quality and safer API over crypto WASM.

  #### How a consumer should update their code

  Unfortunately, the code should be updated completely. Here are some major points you should note.

  `IrohaCryptoInterface` type from the core package is still the same as `crypto` export from target packages, but the content of the type is completely different.

  Previously, types such as `Hash`, `Signature`, `PublicKey` were separate exports from the core library. Now they are contained within the `cryptoTypes` namespace:

  ```ts
  // doesn't work anymore
  // import { Hash } from '@iroha2/crypto-core'

  import { cryptoTypes } from '@iroha2/crypto-core'

  type Hash = cryptoTypes.Hash
  ```

### Patch Changes

- @iroha2/data-model@4.1.0

## 0.1.1

### Patch Changes

- 49c8451: chore: include only necessary files into `files` field in the `package.json`
