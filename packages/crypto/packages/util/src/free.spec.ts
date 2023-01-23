/* eslint-disable max-nested-callbacks */
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { FREE_HEAP, FreeGuard, scopeFreeable } from './free'

function dummyFreeable() {
  return {
    free: vi.fn(),
  }
}

describe('Test `.free()` utilities', () => {
  beforeEach(() => {
    FREE_HEAP.clear()
  })

  describe('when FreeGuard is created', () => {
    test('then it is added to the heap', () => {
      const guard = new FreeGuard(dummyFreeable())

      expect(FREE_HEAP.has(guard)).toBe(true)
    })

    test('within a scope, then it is freed with the scope', () => {
      const dummy = dummyFreeable()

      scopeFreeable(() => {
        const _guard = new FreeGuard(dummy)
      })

      expect(dummy.free).toBeCalled()
    })
  })

  describe('when FreeGuard is freed', () => {
    test('then the underlying object is freed too', () => {
      const dummy = dummyFreeable()
      const guard = new FreeGuard(dummy)

      guard.free()

      expect(dummy.free).toBeCalled()
    })

    test('then it is deleted from the heap', () => {
      const guard = new FreeGuard(dummyFreeable())

      guard.free()

      expect(FREE_HEAP.has(guard)).toBe(false)
    })
  })

  describe('when FreeGuard is forgotten by itself', () => {
    test('then it is deleted from the heap', () => {
      const guard = new FreeGuard(dummyFreeable())

      guard.forget()

      expect(FREE_HEAP.has(guard)).toBe(false)
    })

    test('then the underlying object is not freed', () => {
      const dummy = dummyFreeable()
      const guard = new FreeGuard(dummy)

      guard.forget()

      expect(dummy.free).not.toBeCalled()
    })

    test('then the object is not freed even in the scope', () => {
      const dummy = dummyFreeable()

      scopeFreeable(() => {
        new FreeGuard(dummy).forget()
      })

      expect(dummy.free).not.toBeCalled()
    })
  })

  test('when scope is disposed, all guards are freed', () => {
    const dummies = Array.from({ length: 5 }, () => dummyFreeable())

    scopeFreeable(() => {
      const guards = dummies.map((a) => new FreeGuard(a))
    })

    for (const dummy of dummies) expect(dummy.free).toBeCalled()
  })

  test('when scope is disposed and some guard was "forgotten" by the scope, then it is not freed', () => {
    const dummy = dummyFreeable()

    scopeFreeable((forget) => {
      const guard = new FreeGuard(dummy)
      forget(guard)
    })

    expect(dummy.free).not.toBeCalled()
  })

  test('when scope is disposed within another scope, only inner objects are freed', () => {
    const dummy1 = dummyFreeable()
    const dummy2 = dummyFreeable()

    scopeFreeable(() => {
      const guard1 = new FreeGuard(dummy1)

      scopeFreeable(() => {
        const guard2 = new FreeGuard(dummy2)
      })

      expect(dummy2.free).toBeCalled()
      expect(dummy1.free).not.toBeCalled()
    })

    expect(dummy1.free).toBeCalled()
  })
})
