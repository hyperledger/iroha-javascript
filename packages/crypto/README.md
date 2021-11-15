# @iroha2/monorepo-crypto

It is a service package to handle all crypto-related stuff.

## Struct

`packages` contains `core` package with unified `IrohaCryptoInterface` and `target-{node,web,bundler}` packages with compiled WASM's and implemented crypto interface.

## Commands

**Recompile WASMs** (requires installed `wasm-pack`): compiles WASMs for each target (node, web, bundler) and puts it to `packages/target-<target>` relatively.

```shell
pnpm build:wasm
```

**Recompile entries for each target**: computes `index.d.ts` & `index.js` files from `index.ts` file in each target dir.

```shell
pnpm build:entries
```

_Tip: build WASMs + entries_:

```shell
pnpm build
```

**Recompile `IrohaCryptoInterface` by one of compiled WASMs**: `__entry-core-types-rollup.d.ts` contains actual declaration of the `IrohaCryptoInterface`, combined from the `wasm-pack` type definitions compiled for web target. But, to reverse type dependency, we make rollup from this entrypoint and receive all used types in a single file without any imports, so its look like an origin of types. Output is put to `packages/core/index.d.ts`

```shell
pnpm rollup-types
```
