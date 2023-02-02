# `@iroha/crypto-util`

Utilities shared across crypto packages.

## Usage

```ts
import { freeScope } from '@iroha2/crypto-util'
```

See [`@iroha2/crypto-core`](https://github.com/hyperledger/iroha-javascript/tree/iroha2/packages/crypto/packages/core) package for details.

### Work with `Free`s

All WASM objects have `.free()` method to trigger manual deallocation:

```ts
interface Free {
  free: () => void
}
```

#### Wrap everything with `FreeGuard`

`FreeGuard` is a wrapper around any `Free` object which:

- gives access to the inner object
- throws a friendly error when the object is freed (more friendly than a Rust panic in WASM)
- tracks itself in the global [`FREE_HEAP`](#inspect-active-guards-in-freeheap)
- attaches itself to the current [scope](#scope-guards) if there is some

```ts
import { FreeGuard, freeScope, FREE_HEAP, Free } from '@iroha2/crypto-util'

declare const wasmObject: Free & { do_stuff: () => void }

// this guard is added to the current
const guard = new FreeGuard(wasmObject)

// access the object
guard.object.do_stuff()

// free memory and clear tracks
guard.free()

// it works like `guard.free()`, but doesn't call `.free()` on the object itself
guard.forget()
```

**Note**: you should not call `.free()` on the inner object, but call it on the guard:

```ts
// ✓ CORRECT
guard.free()

// ❌ WRONG
guard.object.free()
```

**Note**: `.forget()` method could be used if you want to "untrack" the guard everywhere, but not to free the object itself.

#### Scope guards

You don't need to manually call `.free()` on each guard you create. You can create them within a scope:

```ts
import { freeScope, FreeGuard } from '@iroha2/crypto-util'

const { barGuard } = freeScope((scope) => {
  const fooGuard = new FreeGuard(foo)
  const barGuard = new FreeGuard(bar)

  // we need to explicitly specify what do want to not
  // be freed when the scope is over
  scope.forget(barGuard)

  return { barGuard }
})

// voila!
// `fooGuard` is freed automatically, while `barGuard` could be used here
```

`FreeScope` API could be used without `freeScope()` too:

```ts
import { FreeScope } from '@iroha2/crypto-util'

const scope = new FreeScope()

scope.track(foo)
scope.track(bar)

// frees every tracked object
scope.free()
```

#### Inspect active guards in `FREE_HEAP`

All `FreeGuard`s are automatically added into the global const `FREE_HEAP` set, so you can inspect it in order to detect what you forget to free, or just to try yourself as a garbage collector for a little time:

```ts
import { FREE_HEAP } from '@iroha2/crypto-util'

for (const guard of FREE_HEAP) {
  console.log('Ooops:', { guard })
  guard.free()
}
```
