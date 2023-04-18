---
'@iroha2/data-model-schema': major
'@iroha2/data-model': major
'@iroha2/client': major
---

Updated according to Iroha `2.0.0-pre-rc.14` (internal release, reference hash: `726f5eabf65a79ea618b4fce62a09cee7a5b13d1`)

Notable changes:

- Renamed structure: ~~`QueryError`~~ `QueryExecutionFailure`
- Introduced new enum struct, `Algorithm`. Changed `digest_function: string` field in `PublicKey` and `PrivateKey` to `digest_function: Algorithm`:
  ```ts
  PublicKey({
    digest_function: Algorithm('Ed25519'),
    // ...
  })
  ```
