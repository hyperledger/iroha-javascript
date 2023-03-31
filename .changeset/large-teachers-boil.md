---
'@iroha2/data-model-schema': major
'@iroha2/data-model': major
'@iroha2/client': major
---

Updated according to Iroha `2.0.0-pre-rc.14` (TODO put finaly stable hash here)

Notable changes:

- Renamed structure: ~~`QueryError`~~ `QueryExecutionFailure`
- `PublicKey` and `PrivateKey` had untyped `digest_function: string` field. Now the new enum struct is introduced - `Algorithm`:
  ```ts
  PublicKey({
    digest_function: Algorithm('Ed25519'),
    // ...
  })
  ```
