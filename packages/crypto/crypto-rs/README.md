# Iroha Crypto WASM (Rust sources)

This Cargo project is a port of [`iroha_crypto` crate](https://github.com/hyperledger/iroha/tree/iroha2-lts/crypto) with `wasm_bindgen`s.

## Rebuild WASMs

To re-create `./wasm-pkg-*`, run in the monorepo root:

```bash
pnpm jake crypto-wasm:rebuild
```

## Be aware of moves

Consider the following example in Rust:

```rs
#[wasm_bindgen]
struct Foo(u32);

#[wasm_bindgen]
struct Bar(u32);

#[wasm_bindgen]
fn create_bar() -> Bar {
    Bar(42)
}

#[wasm_bindgen]
fn foo_from_bar(bar: Bar) -> Foo {
    Foo(bar.0 - 16)
}
```

After you compile this code to WASM and try to use it in JavaScript, your code will panic because `bar` is used **after it was moved to `foo_from_bar`**:

```js
const bar = create_bar()

const foo = foo_from_bar(bar)
//                       ^^^ `bar` is moved here

// panic! null ptr is passed to Rust
const foo2 = foo_from_bar(bar)
//                        ^^^ `bar` cannot be used second time
```

Code panics, because `bar` is used **after it was moved to `foo_from_bar`**. It is completely valid from Rust side and such a usage of `bar` after its movement will cause a compilation error. However, JavaScript can't apply borrowing rules on its side.

Thus, the crypto API doesn't expose any methods that *moves* structs passed into them, but borrows them:

```diff
  #[wasm_bindgen]
- fn foo_from_bar(bar: Bar) -> Foo {
+ fn foo_from_bar(bar: &Bar) -> Foo {
      Foo(bar.0 - 16)
  }
```
It makes the API safer. The cost of it is a higher number of clones and allocations.

You can read more details in [the PR's description](https://github.com/hyperledger/iroha-javascript/pull/69#issue-963187691).
