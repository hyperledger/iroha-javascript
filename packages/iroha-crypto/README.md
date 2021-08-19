# @iroha2/crypto

Iroha's cryptography wrapped into WASM.

## Installation

Configure your package manager to fetch scoped packages from nexus. Example for `npm`/`pnpm` - file `.npmrc`:

```ini
# .npmrc
@iroha2:registry=https://nexus.iroha.tech/repository/npm-group/
```

Then, install packages: 

```sh
npm i @iroha2/crypto
```

## Usage notes

It is not trivial to load WASM in universal way in any environment. Current implementations tested in browser **when it is used as native ES module** (e.g. with `vite`) and in NodeJS **when it is used with some ES module register** (e.g. with `esbuild-register`).

#### Example of usage lib in browser

```ts
import initWasm, { KeyPair, KeyGenConfiguration } from '@iroha2/crypto';

// before any manipulations with exported tools you have to initialize wasm
initWasm().then(() => {
    // now you can use them
    const keyPair = KeyPair.generate_with_configuration(new KeyGenConfiguration());
});
```

#### Example of usage in NodeJS

```ts
import initWasm from '@iroha2/crypto';
import fs from 'fs/promises';

async function loadWasmFromFile() {
    const wasmPath = require.resolve('@iroha2/crypto/wasm/iroha_crypto_bg.wasm');
    const buffer = await fs.readFile(wasmPath);
    return buffer;
}

initWasm(
    // here you have to provide wasm bytes manually
    loadWasmFromFile(),
).then(() => {
    const keyPair = KeyPair.generate_with_configuration(new KeyGenConfiguration());
});
```

## Development

Requirements:

-   Rust: https://www.rust-lang.org/tools/install
-   `wasm-pack`: https://rustwasm.github.io/wasm-pack/installer/

Rebuild wasm:

```sh
pnpm build-wasm
```

Test build in node & web:

```sh
pnpm test
```
