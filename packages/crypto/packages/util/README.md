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
- attaches itself to the current [scope](#scope-guards) if there is any

```ts
import { FreeGuard, freeScope, FREE_HEAP, Free } from '@iroha2/crypto-util'

declare const wasmObject: Free & { do_stuff: () => void }

// add this guard to the current scope
const guard = new FreeGuard(wasmObject)

// access the object
guard.object.do_stuff()

// call `.free()` on the object itself, clear tracks and empty the guard,
// so it will be not usable anymore
guard.free()

// same as `guard.free()`, but without calling `.free()` on the object itself
guard.forget()
```

**Note**: You should not call `.free()` on the inner object. You should call it on the guard instead:

```ts
// ✓ CORRECT
guard.free()

// ❌ WRONG
guard.object.free()
```

**Note**: `.forget()` method could be used if you want to "untrack" the guard everywhere without freeing the object itself.

#### Scope guards

You don't need to manually call `.free()` on each guard you create. You can create them within a scope:

```ts
import { freeScope, FreeGuard } from '@iroha2/crypto-util'

const { barGuard } = freeScope((scope) => {
  const fooGuard = new FreeGuard(foo)
  const barGuard = new FreeGuard(bar)

  // explicitly specify the object that you do not want to 
  // be freed when the scope is over
  scope.forget(barGuard)

  return { barGuard }
})

// voila!
// `fooGuard` is freed automatically, while `barGuard` could still be used here
```

You can also use `FreeScope` API without `freeScope()`:

```ts
import { FreeScope } from '@iroha2/crypto-util'

const scope = new FreeScope()

scope.track(foo)
scope.track(bar)

// free every tracked object
scope.free()
```

#### Inspect active guards in `FREE_HEAP`

All `FreeGuard`s are automatically added into the global const `FREE_HEAP` set. You can inspect it in order to detect what you forgot to free:

```ts
import { FREE_HEAP } from '@iroha2/crypto-util'

for (const guard of FREE_HEAP) {
  console.log('Ooops:', { guard })
  guard.free()
}
```
