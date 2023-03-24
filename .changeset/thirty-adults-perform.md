---
'@iroha2/crypto-target-bundler': minor
'@iroha2/crypto-target-node': minor
'@iroha2/crypto-target-web': minor
'@iroha2/crypto-core': minor
---

**refactor**: respect new `Algorithm` type & codec from `data-model` and combine it with the crypto's simple `Algorithm` type with is simply a string. Add `Algorithm.toDataModel` and `Algorithm.fromDataModel` methods.
