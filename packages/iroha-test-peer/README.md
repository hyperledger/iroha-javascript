# @iroha/test-peer

Wrapper around `iroha_cli` crate binary that provides easy-to-use interface to work with Iroha peer. Usefull for tests and used by `@iroha/client` for it's e2e-tests.

**This package requires Rust's toolchain and Cargo to be installed on working machine.**

Package initializes on `postinstall` hook, so, if you have installed workspace packages, then it should be ready to use. If not, you can manually run `pnpm postinstall` script in this package.
