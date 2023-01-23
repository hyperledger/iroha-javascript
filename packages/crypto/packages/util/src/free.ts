export interface Freeable {
  free: () => void
}

export class FreeableScope implements Freeable {
  public static readonly getInnerTrackObject = Symbol('GetInnerTrackObject')

  public static readonly trackObject = Symbol('TrackObject')

  #tracked = new Set<TrackObject>()

  public track(object: TrackObject): void {
    this.#tracked.add(object)
  }

  /**
   * Removes the object from being tracked by the scope, preventing the object from
   * being freed when the scope is freed.
   *
   * @param object the object itself, or its accessor
   * @param strict if `true` and the object is not tracked, throws an error
   */
  public forget(object: TrackObjectOrInner, strict = true): void {
    let unwrapped: TrackObject
    {
      let i = object
      while (!(FreeableScope.trackObject in i)) {
        i = i[FreeableScope.getInnerTrackObject]()
      }
      unwrapped = i
    }

    if (this.#tracked.has(unwrapped)) this.#tracked.delete(unwrapped)
    else if (strict) throw new Error(`The object ${String(unwrapped)} is not tracked`)
  }

  public free(): void {
    for (const object of this.#tracked) {
      object.free()
    }
  }
}

export interface GetInnerTrackObject {
  [FreeableScope.getInnerTrackObject]: () => TrackObjectOrInner
}

export interface TrackObject extends Freeable {
  [FreeableScope.trackObject]: true
}

export type TrackObjectOrInner = TrackObject | GetInnerTrackObject

export const FREE_HEAP = new Set<FreeGuard<Freeable>>()

/**
 * Wrapper around a free-able object to control its access,
 * to track in a global heap (see {@link FREE_HEAP}), and to track
 * within scopes (see {@link FreeableScope}).
 */
export class FreeGuard<T extends Freeable> implements TrackObject {
  public readonly [FreeableScope.trackObject] = true

  #maybeInner: null | {
    object: T
    scope: null | FreeableScope
  }

  public constructor(object: T) {
    const scope = getCurrentScope()
    this.#maybeInner = { object, scope }
    scope?.track(this)
    FREE_HEAP.add(this)
  }

  /**
   * Getter to access the underlying object
   *
   * # Errors
   *
   * Throws if the guard was freed or forgotten
   */
  public get object(): T {
    if (!this.#maybeInner) {
      throw new Error('The underlying object is missing')
    }
    return this.#maybeInner.object
  }

  /**
   * Frees the underlying object and calls {@link forget}
   */
  public free(): void {
    const obj = this.object
    obj.free()
    this.forget()
  }

  /**
   * Removes the guard from {@link FREE_HEAP} and the attached scope (if there is)
   * and removes the ability to access the underlying object.
   *
   * Same as {@link free}, but doesn't call {@link Freeable.free} on the underlying object.
   */
  public forget(): void {
    if (!this.#maybeInner) throw new Error('Already forgotten')
    const { scope } = this.#maybeInner
    FREE_HEAP.delete(this)
    scope?.forget(this, false)
    this.#maybeInner = null
  }
}

const SCOPES_STACK: FreeableScope[] = []

export function getCurrentScope(): FreeableScope | null {
  return SCOPES_STACK.at(-1) ?? null
}

export type ForgetFn = (object: TrackObjectOrInner) => void

/**
 * Runs the provided function, tracking all trackable (see {@link TrackObject}) objets that
 * *synchronously* bind to the scope during the function execution. When the execution is over
 * (even if it is failed), all tracked objects are freed.
 *
 * Scopes might be nested into each other.
 *
 * In order to exclude some object from being freed with the scope, the `forget` callback might be used:
 *
 * ```ts
 * let outerGuard, innerGuard
 *
 * scopeFreeable((forget) => {
 *   innerGuard = new FreeGuard({ ... })
 *   outerGuard = new FreeGuard({ ... })
 *
 *   forget(outerGuard)
 * })
 *
 * // at this point, `innerGuard` is freed, but `outerGuard` is not
 * ```
 *
 * Note that `forget` callback does not execute {@link FreeGuard.forget}, but {@link FreeGuard.forget}
 * removes the guard from the scope.
 */
export function scopeFreeable<T>(fn: (forget: ForgetFn) => T): T {
  const scope = new FreeableScope()
  SCOPES_STACK.push(scope)

  try {
    return fn((object) => scope.forget(object))
  } finally {
    scope.free()
    SCOPES_STACK.pop()
  }
}
