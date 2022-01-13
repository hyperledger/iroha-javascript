# @iroha2/client

## 0.4.1

### Patch Changes

-   81f5a88: **fix**: use isomorphic implementations of Fetch API and WebSocket API

## 0.4.0

### Minor Changes

-   98d3638: **breaking**: remove `*` re-export from `@iroha2/data-model`
-   98d3638: **feat**: add `status` endpoint implementation
-   98d3638: **breaking**: update configuration format

    -   Now both Torii API URl & Torii Status URL are optional, so it is possible to use client partially, e.g. if you only need to check status.
    -   `crypto` injection is excluded from the config. Now it should be set globally with `setCrypto()` function.

### Patch Changes

-   92c5a9a: Add library top-level short documentation
-   92c5a9a: Export `SetupEventsParams` type
-   Updated dependencies [92c5a9a]
-   Updated dependencies [98d3638]
    -   @iroha2/data-model@0.5.0

## 0.3.0

### Minor Changes

-   c59c85b: **Breaking:** update data model generation approach & usage with updated SCALE codec kit

### Patch Changes

-   Updated dependencies [c59c85b]
    -   @iroha2/data-model@0.4.0

## 0.2.4

### Patch Changes

-   0a583c2: deps: update code accordingly to changes in data-model pkg
-   Updated dependencies [0a583c2]
-   Updated dependencies [0a583c2]
    -   @iroha2/data-model@0.3.0

## 0.2.3

### Patch Changes

-   1833de7: Update due to bump of `@iroha2/data-model` pkg
-   Updated dependencies [1833de7]
    -   @iroha2/data-model@0.2.1
