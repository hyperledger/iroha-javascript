export interface Freeable {
  free: () => void
}

export type CollectFn = <T extends Freeable>(whatever: T) => T

export function garbageScope<T>(fn: (collect: CollectFn) => T): T {
  const garbage: Freeable[] = []

  try {
    return fn((x) => {
      garbage.push(x)
      return x
    })
  } finally {
    for (const x of garbage) {
      x.free()
    }
  }
}
