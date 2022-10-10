---
'@iroha2/client': minor
---

Some functions were renamed:

- `makeSignedTransaction` → `makeVersionedSignedTransaction`
- `makeSignedQuery` → `makeVersionedSignedQuery`

Old names are still accessible. They are marked as `deprecated` and will be removed in future major releases.
