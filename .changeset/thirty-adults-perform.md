---
'@iroha2/crypto-target-bundler': minor
'@iroha2/crypto-target-node': minor
'@iroha2/crypto-target-web': minor
'@iroha2/crypto-core': minor
---

**refactor**: combine new `Algorithm` type and codec from `data-model` with the crypto's `Algorithm` type, which is simply a string. Add `Algorithm.toDataModel` and `Algorithm.fromDataModel` methods.
