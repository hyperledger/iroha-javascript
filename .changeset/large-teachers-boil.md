---
'@iroha2/data-model-schema': major
'@iroha2/data-model': major
'@iroha2/client': major
---

Updated according to Iroha `2.0.0-pre-rc.14` (TODO put finaly stable hash here)

Notable changes:

- Renamed structure: ~~`QueryError`~~ `QueryExecutionFailure`
- Introduced new enum struct, `Algorithm`. Changed `digest_function: string` field in `PublicKey` and `PrivateKey` to `digest_function: Algorithm`:
  ```ts
  PublicKey({
    digest_function: Algorithm('Ed25519'),
    // ...
  })
  ```
