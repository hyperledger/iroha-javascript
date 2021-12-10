---
'@iroha2/client': minor
---

**breaking**: update configuration format

-   Now both Torii API URl & Torii Status URL are optional, so it is possible to use client partially, e.g. if you only need to check status.
-   `crypto` injection is excluded from the config. Now it should be set globally with `setCrypto()` function.
