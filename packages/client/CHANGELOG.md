# @iroha2/client

## 1.3.0

### Minor Changes

- bdddf78: **breaking**: update and data-model accordingly to Iroha 2 RC 5 (`43be45fc7fb7b0bd73f87b4fef167d61680c8e1e`)
- bdddf78: **feat**: `client.request()` now accepts optional filter as `PredicateBox`

### Patch Changes

- 7ca19df: **feat**: `client.getHealth()` catches fetch errors and wraps them into `Result::Err` variant
- Updated dependencies [bdddf78]
  - @iroha2/data-model@1.3.0

## 1.2.1

### Patch Changes

- 49c8451: chore: include only necessary files into `files` field in the `package.json`
- Updated dependencies [49c8451]
- Updated dependencies [49c8451]
  - @iroha2/crypto-core@0.1.1
  - @iroha2/data-model@1.2.1
  - @iroha2/client-isomorphic-fetch@0.2.0

## 1.2.0

### Minor Changes

- update client according to updated data-model for RC4 (`d00e0a9172d2a887a97f504796db5f2e05939c10`)

### Patch Changes

- Updated dependencies
  - @iroha2/data-model@1.2.0

## 1.1.0

### Minor Changes

- e34f8a5: update client according to Iroha 2 RC 3 (`8d83a3eff33f29b49004a0a5efe643b10f0f256e`)

### Patch Changes

- Updated dependencies [a453fcd]
- Updated dependencies [a453fcd]
- Updated dependencies [e34f8a5]
  - @iroha2/data-model@1.1.0

## 1.0.0

### Major Changes

- b86aa76: Target Iroha: `iroha v2.0.0-pre-rc.2` (`920e4d12754b0f3bf08cbaa5221d91c27863fcdc`)

  - Using updated Data Model
  - Completely refactor client methods, extend them with new APIs - `setPeerConfig()`, `getMetrics()`, `listenForBlocksStream()`
  - New client configuration accepts account id and key pair
  - `Client.create()` -> `new Client()`

### Patch Changes

- Updated dependencies [b86aa76]
- Updated dependencies [b86aa76]
  - @iroha2/data-model@1.0.0
  - @iroha2/client-isomorphic-ws@0.2.0

## 0.4.1

### Patch Changes

- 81f5a88: **fix**: use isomorphic implementations of Fetch API and WebSocket API

## 0.4.0

### Minor Changes

- 98d3638: **breaking**: remove `*` re-export from `@iroha2/data-model`
- 98d3638: **feat**: add `status` endpoint implementation
- 98d3638: **breaking**: update configuration format

  - Now both Torii API URl & Torii Status URL are optional, so it is possible to use client partially, e.g. if you only need to check status.
  - `crypto` injection is excluded from the config. Now it should be set globally with `setCrypto()` function.

### Patch Changes

- 92c5a9a: Add library top-level short documentation
- 92c5a9a: Export `SetupEventsParams` type
- Updated dependencies [92c5a9a]
- Updated dependencies [98d3638]
  - @iroha2/data-model@0.5.0

## 0.3.0

### Minor Changes

- c59c85b: **Breaking:** update data model generation approach & usage with updated SCALE codec kit

### Patch Changes

- Updated dependencies [c59c85b]
  - @iroha2/data-model@0.4.0

## 0.2.4

### Patch Changes

- 0a583c2: deps: update code accordingly to changes in data-model pkg
- Updated dependencies [0a583c2]
- Updated dependencies [0a583c2]
  - @iroha2/data-model@0.3.0

## 0.2.3

### Patch Changes

- 1833de7: Update due to bump of `@iroha2/data-model` pkg
- Updated dependencies [1833de7]
  - @iroha2/data-model@0.2.1
