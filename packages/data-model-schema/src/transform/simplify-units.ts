import type { DefAlias, NamespaceDefinition, TypeDef } from '@scale-codec/definition-compiler'
import { Map } from 'immutable'
import { P, match } from 'ts-pattern'

function transformRefs(def: Exclude<TypeDef, { t: 'enum' | 'import' }>, fn: (ref: string) => string): TypeDef {
  return match<typeof def, typeof def>(def)
    .with({ t: P.union('array', 'vec') }, (arr) => ({ ...arr, item: fn(arr.item) }))
    .with({ t: 'map' }, (map) => ({ ...map, key: fn(map.key), value: fn(map.value) }))
    .with({ t: 'set' }, (set) => ({ ...set, entry: fn(set.entry) }))
    .with({ t: 'struct' }, (struct) => ({ ...struct, fields: struct.fields.map((x) => ({ ...x, ref: fn(x.ref) })) }))
    .with({ t: 'alias' }, (alias) => ({ ...alias, ref: fn(alias.ref) }))
    .with({ t: 'tuple' }, (tuple) => ({ ...tuple, ref: tuple.items.map(fn) }))
    .with({ t: P.union('bytes-array') }, (x) => x)
    .with({ t: 'result' }, (result) => ({ ...result, ok: fn(result.ok), err: fn(result.err) }))
    .with({ t: 'option' }, (option) => ({ ...option, some: fn(option.some) }))
    .exhaustive()
}

export function simplifyUnits(schema: NamespaceDefinition, params: { unitType: string }): NamespaceDefinition {
  const map = Map(schema)

  const unitAliases = map
    .filter((v): v is DefAlias & { t: 'alias' } => v.t === 'alias')
    .filter((alias, _k, map) => {
      const met = new Set<string>()
      let i = alias
      while (i.ref !== params.unitType) {
        if (met.has(i.ref)) {
            console.log('Met types so far:', met)
            throw new Error('dont expect recursive types')
        }
        met.add(i.ref)

        const other = map.get(i.ref)

        if (other)
          // also alias, proceed
          i = other
        // not an alias, and unit type hasn't occurred
        else return false
      }

      return true
    })
    .keySeq()
    .toSet()

  const isUnitRef = (ref: string): boolean => ref === params.unitType || unitAliases.has(ref)

  return map
    .filter((v, k) => !unitAliases.has(k))
    .map((def) => {
      return match<typeof def, TypeDef>(def)
        .with({ t: 'enum', variants: P.select() }, (vars) => {
          return {
            t: 'enum',
            variants: vars.map((item) => {
              if (item.ref) {
                if (isUnitRef(item.ref)) {
                  const copy = { ...item }
                  delete copy.ref
                  return copy
                }
              }
              return item
            }),
          }
        })
        .otherwise((x) => {
          if (x.t === 'import') return x
          return transformRefs(x, (ref) => {
            if (unitAliases.has(ref)) return params.unitType
            return ref
          })
        })
    })
    .toObject()
}
