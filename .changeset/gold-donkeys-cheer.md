---
'@iroha2/client': major
---

**refactor!**: split the library functionality into `Torii`, `Signer` and `Client` entities.

- **What the breaking change is**: previously, `Client` class did everything - constructed transactions payloads, signed them, submitted them and queries, etc. Now some functionality moved out from it.

  `Torii` does everything related to HTTP/WebSocket communication with Iroha Peer. `Signer` makes signatures. `Client` just wraps them together for tiny convenient methods. Utilities, related to making payloads, signing them, wrapping into final containers etc are exported from the library as separate functions.

- **Why the change was made**: there are request to extend library functionality, and this change was made to make codebase more scalable. Also, separating crypto functionality from transport stuff is a common practice for blockchain SDKs, e.g. take a look at [`ethers` project](https://docs.ethers.io/v5/).

- **How a consumer should update their code**: look at `Torii`, `Signer` and `Client` type definitions. They are not very complex and you should adopt very quickly.
