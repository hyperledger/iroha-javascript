# Iroha Crypto WASM - Rust sources

This Cargo project is a port of [`iroha_crypto` crate](https://github.com/hyperledger/iroha/tree/iroha2-lts/crypto) with `wasm_bindgen`s.

## Rebuild WASMs

To re-create `./wasm-pkg-*`, run in the monorepo root:

```bash
pnpm jake crypto-wasm:rebuild
```

## Be aware of moves

Read more about it in [the PR's description for more detail](https://github.com/hyperledger/iroha-javascript/pull/69#issue-963187691).
