/* eslint-disable max-nested-callbacks */
import { NamespaceDefinition, TypeDef } from '@scale-codec/definition-compiler'
import { RustResult, variant } from '@scale-codec/core'
import { RustDefinitions, RustFixedPointDef, RustTypeDefinitionVariant } from './types'
import {
  isRustArrayDef,
  isRustDirectAlias,
  isRustEnumDef,
  isRustFixedPointDef,
  isRustIntDef,
  isRustMapDef,
  isRustOptionDef,
  isRustStructDef,
  isRustTupleDef,
  isRustTupleStructDef,
  isRustVecDef,
} from './type-assertions'
import { Map, Set } from 'immutable'
import { transform as transformRef } from './ref'
import Debug from 'debug'
import { match } from 'ts-pattern'

const debug = Debug('iroha2-schema-transform')

const IGNORE_TYPES = Set<string>([
  // any ints
  ...[3, 4, 5, 6, 7]
    .map((power) => 2 ** power)
    .map((bits) => [`i${bits}`, `u${bits}`])
    .flat(),
  'bool',
  'Vec<u8>',
])

function rawSchemaFilter(value: RustTypeDefinitionVariant, key: string): boolean {
  if (IGNORE_TYPES.has(key)) {
    debug('type filtered because of ignore types list: %o', key)
    return false
  }

  if (isRustDirectAlias(value)) {
    debug('type %o ignored because it is alias to %o', key, value)
    return false
  }

  if (isRustIntDef(value)) {
    debug('type %o ignored because it is %o', key, value)
    return false
  }

  return true
}

function transformRustDef(def: Exclude<RustTypeDefinitionVariant, RustFixedPointDef>): RustResult<TypeDef, string> {
  if (isRustArrayDef(def)) {
    const { len, ty } = def.Array

    if (ty === 'u8') {
      // specially cover case with array of bytes
      return variant('Ok', {
        t: 'bytes-array',
        len,
      })
    }

    return variant('Ok', {
      t: 'array',
      len,
      item: transformRef(ty),
    })
  }
  if (isRustMapDef(def)) {
    const { key, value } = def.Map

    return variant('Ok', {
      t: 'map',
      key: transformRef(key),
      value: transformRef(value),
      // TODO handle `def.Map.sorted_by_key` field
    })
  }
  if (isRustStructDef(def)) {
    return variant('Ok', {
      t: 'struct',
      fields: def.Struct.declarations.map(({ name, ty }) => ({
        name,
        ref: transformRef(ty),
      })),
    })
  }
  if (isRustEnumDef(def)) {
    return variant('Ok', {
      t: 'enum',
      variants: def.Enum.variants.map(({ name, discriminant, ty }) => ({
        name,
        discriminant,
        ref: ty && transformRef(ty),
      })),
    })
  }
  if (isRustOptionDef(def)) {
    return variant('Ok', {
      t: 'option',
      some: transformRef(def.Option),
    })
  }
  if (isRustVecDef(def)) {
    return variant('Ok', {
      t: 'vec',
      // TODO handle def.Vec.sorted
      item: transformRef(def.Vec.ty),
    })
  }
  if (isRustTupleStructDef(def)) {
    return variant('Ok', {
      t: 'tuple',
      items: def.TupleStruct.types.map((x) => transformRef(x)),
    })
  }
  if (isRustTupleDef(def)) {
    return variant('Ok', {
      t: 'tuple',
      items: def.Tuple.types.map(transformRef),
    })
  }
  if (isRustIntDef(def)) {
    return variant('Err', `Int should has been filtered on an earlier stage: ${def.Int}`)
  }
  if (isRustDirectAlias(def)) {
    return variant('Err', `Alias should has been filtered: ${def}`)
  }

  // noinspection UnnecessaryLocalVariableJS
  const undefinedDef: never = def
  debug('Unknown def: %O', undefinedDef)
  return variant('Err', 'Unexpected definition (set DEBUG env var to see details)')
}

export interface FixedPointParams {
  base: string
  decimalPlaces: number
  ref: string
}

export interface TransformReturn {
  definition: NamespaceDefinition
  fixedPoints: FixedPointParams[]
}

export function transformSchema(schema: RustDefinitions): TransformReturn {
  return Map(schema)
    .filter(rawSchemaFilter)
    .reduce<TransformReturn>(
      (acc, value, key) => {
        const ref = transformRef(key)

        if (isRustFixedPointDef(value)) {
          const { decimal_places: decimalPlaces, base } = value.FixedPoint
          acc.fixedPoints.push({ base, ref, decimalPlaces })
        } else {
          const typedef = match(transformRustDef(value))
            .with({ tag: 'Ok' }, ({ content }) => content)
            .with({ tag: 'Err' }, ({ content }) => {
              throw new Error(content)
            })
            .exhaustive()

          acc.definition[ref] = typedef
        }

        return acc
      },
      { definition: {}, fixedPoints: [] },
    )
}
