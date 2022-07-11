# Documentation recipes

The `@iroha2/docs-recipes` package contains a collection of code samples that are used for [Iroha 2 JS Tutorial](https://hyperledger.github.io/iroha-2-docs/guide/javascript.html).

## Why have a separated package?

The code samples are combined in a separate package for the following reasons:

- To collect all recipes in a single place
- To use actual imports (like `@iroha2/client`) in code
- To test the documentation since the written code is affected by global repo type-check

## Contents

- [Install the client](./src/1-client-install.ts)
- [Configure the client](./src/2.1-client-config.ts)
- [Generate a key-pair](./src/2.2-gen-keypair.ts)
- [Register a domain](./src/3-register-domain.ts)
- [Register an account](./src/4-register-account.ts)
- [Register an asset](./src/5.1-reg-asset.ts)
- [Mint an asset](./src/5.2-mint.ts)
