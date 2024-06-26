/* eslint-disable max-nested-callbacks,no-new */
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { FREE_HEAP, FreeGuard, FreeScope, freeScope } from './free'

function dummyFree() {
  return {
    free: vi.fn(),
  }
}

function dummyAccessor() {
  return {
    guard: new FreeGuard(dummyFree()),
    [FreeScope.getInnerTrackObject]() {
      return this.guard
    },
  }
}

describe('Test `.free()` utilities', () => {
  beforeEach(() => {
    FREE_HEAP.forEach((a) => a.free())
    FREE_HEAP.clear()
  })

  describe('when FreeGuard is created', () => {
    test('then it is added to the heap', () => {
      const guard = new FreeGuard(dummyFree())

      expect(FREE_HEAP.has(guard)).toBe(true)
    })

    test('within a scope, then it is freed with the scope', () => {
      const dummy = dummyFree()

      freeScope(() => {
        new FreeGuard(dummy)
      })

      expect(dummy.free).toBeCalled()
    })
  })

  describe('when FreeGuard is freed', () => {
    test('then the underlying object is freed too', () => {
      const dummy = dummyFree()
      const guard = new FreeGuard(dummy)

      guard.free()

      expect(dummy.free).toBeCalled()
    })

    test('then it is deleted from the heap', () => {
      const guard = new FreeGuard(dummyFree())

      guard.free()

      expect(FREE_HEAP.has(guard)).toBe(false)
    })
  })

  describe('when FreeGuard is forgotten by itself', () => {
    test('then it is deleted from the heap', () => {
      const guard = new FreeGuard(dummyFree())

      guard.forget()

      expect(FREE_HEAP.has(guard)).toBe(false)
    })

    test('then the underlying object is not freed', () => {
      const dummy = dummyFree()
      const guard = new FreeGuard(dummy)

      guard.forget()

      expect(dummy.free).not.toBeCalled()
    })

    test('then the object is not freed even in the scope', () => {
      const dummy = dummyFree()

      freeScope(() => {
        new FreeGuard(dummy).forget()
      })

      expect(dummy.free).not.toBeCalled()
    })
  })

  test('when scope is disposed, all guards are freed', () => {
    const dummies = Array.from({ length: 5 }, () => dummyFree())

    freeScope(() => {
      dummies.map((a) => new FreeGuard(a))
    })

    for (const dummy of dummies) expect(dummy.free).toBeCalled()
  })

  test('when scope is disposed and some guard was "forgotten" by the scope, then it is not freed', () => {
    const dummy = dummyFree()

    freeScope((scope) => {
      const guard = new FreeGuard(dummy)
      scope.forget(guard)
    })

    expect(dummy.free).not.toBeCalled()
  })

  test('when scope is disposed within another scope, only inner objects are freed', () => {
    const dummy1 = dummyFree()
    const dummy2 = dummyFree()

    freeScope(() => {
      new FreeGuard(dummy1)

      freeScope(() => {
        new FreeGuard(dummy2)
      })

      expect(dummy2.free).toBeCalled()
      expect(dummy1.free).not.toBeCalled()
    })

    expect(dummy1.free).toBeCalled()
  })

  test('case with nested scopes, forgetting and tracking back', () => {
    const guard = freeScope((scope) => {
      const inner = freeScope((scope) => {
        new FreeGuard(dummyFree())
        const guard = new FreeGuard(dummyFree())
        scope.forget(guard)
        return guard
      })

      expect(inner.object.free).not.toBeCalled()

      // not necessary - it is tracked by parent scope by default
      // scope.track(inner)

      const outer = new FreeGuard(dummyFree())
      scope.forget(outer)
      return outer
    })

    expect(guard.object.free).not.toBeCalled()

    guard.free()

    expect(FREE_HEAP.size).toBe(0)
  })

  describe('Accessing inner track object', () => {
    test('It could be tracked by scope', () => {
      const accessor = dummyAccessor()
      const { free } = accessor.guard.object
      const scope = new FreeScope()

      scope.track(accessor)
      scope.free()

      expect(free).toBeCalled()
    })

    test('It could be forgotten by scope', () => {
      const accessor = dummyAccessor()
      const scope = new FreeScope()

      scope.track(accessor)
      scope.forget(accessor)
      scope.free()

      expect(accessor.guard.object.free).not.toBeCalled()
    })
  })

  test('When an object is forgotten in the nested scope, it is tracked by the parent ones', () => {
    freeScope(() => {
      freeScope((scope) => {
        const guard = new FreeGuard(dummyFree())
        scope.forget(guard)
      })

      expect(FREE_HEAP.size).toBe(1)
    })

    expect(FREE_HEAP.size).toBe(0)
  })

  test('When an object is forgotten and not adopted in the nested scope, it is not tracked by the parent ones', () => {
    freeScope(() =>
      freeScope(() =>
        freeScope((scope) => {
          const guard = new FreeGuard(dummyFree())
          scope.forget(guard, { adopt: false })
        }),
      ),
    )

    expect(FREE_HEAP.size).toBe(1)
  })
})
