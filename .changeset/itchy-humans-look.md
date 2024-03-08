---
'@iroha2/crypto-core': major
'@iroha2/crypto-target-bundler': major
'@iroha2/crypto-target-node': major
'@iroha2/crypto-target-web': major
---

**Breaking:** Complete rewrite of crypto WASM, and major update of the surrounding API.

- Now WASM is made from the original `iroha_crypto` from Iroha 2 repo. As one of the outcomes, binary blob size is reduced from 2mb to 600kb.   
- Remove `KeyGenConfiguration`. Use `KeyPair.deriveFromSeed`, `KeyPair.deriveFromPrivateKey`, and `KeyPair.random` instead.
- Normalise API across `PublicKey`, `PrivateKey`, `KeyPair`, and `Signature` classes (JSON methods, raw conversion methods etc.)
- Introduce `Bytes` utility to accept binary input either as `Bytes.array([1, 2, 3])` or `Bytes.hex('001122')`
- Export more types¡

See the [issue](https://github.com/hyperledger/iroha-javascript/issues/186) for related context. 
