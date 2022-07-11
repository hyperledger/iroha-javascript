# `@iroha2/crypto-target-web`

The `@iroha2/crypto-target-web` contains a crypto WASM fcompiled with the `web` target.
This package provides crypto interface for native Web (ESM).

## Usage

```ts
import { crypto, init } from '@iroha2/crypto-target-web';

init().then(() => {
    // use crypto
});
```

See [`@iroha2/crypto-core`](../core/) package for details.
