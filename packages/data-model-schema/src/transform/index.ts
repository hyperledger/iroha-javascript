import { NamespaceDefinition, TypeDef } from '@scale-codec/definition-compiler'
import { Enum, Result } from '@scale-codec/definition-runtime'
import { RustDefinitions, RustTypeDefinitionVariant } from './types'
import {
  isRustMapDef,
  isRustVecDef,
  isRustDirectAlias,
  isRustArrayDef,
  isRustEnumDef,
  isRustIntDef,
  isRustFixedPointDef,
  isRustOptionDef,
  isRustStructDef,
  isRustTupleStructDef,
} from './type-assertions'
import { Map, Set } from 'immutable'
import { transform as transformRef } from './ref'
import Debug from 'debug'

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

const AVAILABLE_FIXED_POINTS = Set(['I64P9'])

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

function extractAdditionalTypesFromBTreeStructures(
  map: Map<string, RustTypeDefinitionVariant>,
): [added: Map<string, TypeDef>, filtered: Set<string>] {
  return map.reduce(
    ([add, filter], value, key) => {
      if (key.startsWith('BTreeMap')) {
        if (!isRustMapDef(value)) throw new Error(`"${key}" is btreemap but not a map`)

        return [
          add.set(transformRef(key), {
            t: 'map',
            key: transformRef(value.Map.key),
            value: transformRef(value.Map.value),
          }),
          filter.add(key),
        ]
      } else if (key.startsWith('BTreeSet')) {
        if (!isRustVecDef(value)) throw new Error(`"${key}" is btreeset but not a vec`)

        return [
          add.set(transformRef(key), {
            t: 'set',
            entry: transformRef(value.Vec),
          }),
          filter.add(key),
        ]
      }
      return [add, filter]
    },
    [Map(), Set()],
  )
}

function ok<Ok, Err>(ok: Ok): Result<Ok, Err> {
  return Enum.variant('Ok', ok)
}

function err<Ok, Err>(err: Err): Result<Ok, Err> {
  return Enum.variant('Err', err)
}

function transformRustDef(def: RustTypeDefinitionVariant): Result<TypeDef, string> {
  if (isRustArrayDef(def)) {
    const { len, ty } = def.Array

    if (ty === 'u8') {
      // specially cover case with array of bytes
      return ok({
        t: 'bytes-array',
        len,
      })
    }

    return ok({
      t: 'array',
      len,
      item: transformRef(ty),
    })
  }
  if (isRustMapDef(def)) {
    const { key, value } = def.Map

    return ok({
      t: 'map',
      key: transformRef(key),
      value: transformRef(value),
    })
  }
  if (isRustStructDef(def)) {
    return ok({
      t: 'struct',
      fields: def.Struct.declarations.map(({ name, ty }) => ({
        name,
        ref: transformRef(ty),
      })),
    })
  }
  if (isRustEnumDef(def)) {
    return ok({
      t: 'enum',
      variants: def.Enum.variants.map(({ name, discriminant, ty }) => ({
        name,
        discriminant,
        ref: ty && transformRef(ty),
      })),
    })
  }
  if (isRustOptionDef(def)) {
    return ok({
      t: 'option',
      some: transformRef(def.Option),
    })
  }
  if (isRustVecDef(def)) {
    return ok({
      t: 'vec',
      item: transformRef(def.Vec),
    })
  }
  if (isRustTupleStructDef(def)) {
    return ok({
      t: 'tuple',
      items: def.TupleStruct.types.map((x) => transformRef(x)),
    })
  }
  if (isRustFixedPointDef(def)) {
    const {
      FixedPoint: { decimal_places, base },
    } = def
    /**
     * Something like `I64P9`
     */
    const fixedPointKey = `${base.toUpperCase()}P${decimal_places}`
    if (AVAILABLE_FIXED_POINTS.has(fixedPointKey)) {
      return ok({
        t: 'import',
        module: `./fixed-point`,
        nameInModule: `FixedPoint${fixedPointKey}`,
      })
    }
    return err(`Unsupported fixed point with base ${base} and ${decimal_places} decimal places`)
  }

  debug('Unknown def: %O', def)
  return err('Unexpected definition')
}

export function transformSchema(schema: RustDefinitions): NamespaceDefinition {
  let schemaMap = Map(schema).filter(rawSchemaFilter)

  const [add, filter] = extractAdditionalTypesFromBTreeStructures(schemaMap)

  return schemaMap
    .filter((v, key) => !filter.has(key))
    .mapEntries(([key, value]) => [transformRef(key), transformRustDef(value).as('Ok')])
    .merge(add)
    .reduce<NamespaceDefinition>((acc, value, key) => {
      acc[key] = value
      return acc
    }, {})
}
