---
'@iroha2/client': minor
---

**feat**: export utility functions to deal with Transaction/Query payload building, hashing and signing.

For transactions:

- `makeTransactionPayload()`
- `computeTransactionHash()`
- `signTransaction()`
- `makeSignedTransaction()`
- `executableIntoSignedTransaction()`

For queries:

- `makeQueryPayload()`
- `computeQueryHash()`
- `signQuery()`
- `makeSignedQuery()`
- `queryBoxIntoSignedQuery()`
