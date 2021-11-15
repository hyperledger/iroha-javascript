# @iroha2/test-peer

Wrapper around the `iroha_cli` crate binary that provides an easy-to-use interface to work with the Iroha peer. Usefull for tests and is used by `@iroha2/client` for it's e2e-tests.

**This package requires Rust's toolchain and Cargo to be installed on the working machine.**

This package initializes on `postinstall` hook, so, if you have installed workspace packages, then it should be ready to use. If not, you could manually run `pnpm postinstall` script in this package.

## Tip: explore underlying peer's logs

Use [`DEBUG` convention](https://github.com/visionmedia/debug#usage). For example:

```shell
DEBUG=* pnpm cli -- start
```
