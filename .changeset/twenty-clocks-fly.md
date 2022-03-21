---
'@iroha2/client': major
---

Target Iroha: `iroha v2.0.0-pre-rc.2` (`920e4d12754b0f3bf08cbaa5221d91c27863fcdc`)

-   Using updated Data Model
-   Completely refactor client methods, extend them with new APIs - `setPeerConfig()`, `getMetrics()`, `listenForBlocksStream()`
-   New client configuration accepts account id and key pair
-   `Client.create()` -> `new Client()`
