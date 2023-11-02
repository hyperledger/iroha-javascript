/* eslint-disable max-nested-callbacks */
import type { NamespaceDefinition, TypeDef } from '@scale-codec/definition-compiler'
import Debug from './debug'
import { Map } from 'immutable'
import { P, match } from 'ts-pattern'
import { filter as filterRef, transform as transformRef, tryParseNonZero } from './ref'
import { simplifyUnits } from './simplify-units'
import type { FixedPointDefinition, IntDefinition, Schema, SchemaTypeDefinition } from '@iroha2/data-model-schema'

const debugRoot = Debug.extend('transform')
const debugFilter = debugRoot.extend('filter')
const debugEntry = debugRoot.extend('entry')

function filterRawEntry(
  value: SchemaTypeDefinition,
  key: string,
): value is Exclude<SchemaTypeDefinition, IntDefinition> {
  if (!filterRef(key)) {
    debugFilter('ignore %o: ref filter', key)
    return false
  }

  return match<typeof value, boolean>(value)
    .with({ Int: P.string }, () => {
      debugFilter('ignore %o: it is an int %o', key, value)
      return false
    })
    .otherwise(() => true)
}

function transformRustDef(def: Exclude<SchemaTypeDefinition, FixedPointDefinition | IntDefinition>): TypeDef {
  return (
    match<typeof def, TypeDef>(def)
      .with({ Array: { type: 'u8', len: P.select() } }, (len) => {
        return {
          t: 'bytes-array',
          len,
        }
      })
      .with({ Array: P.select() }, ({ len, type }) => {
        return {
          t: 'array',
          len,
          item: transformRef(type),
        }
      })
      .with({ Map: P.select() }, ({ key, value }) => {
        return {
          t: 'map',
          key: transformRef(key),
          value: transformRef(value),
        }
      })
      .with({ Struct: P.select() }, (fields) => {
        return {
          t: 'struct',
          fields: fields.map(({ name, type }) => ({
            name,
            ref: transformRef(type),
          })),
        }
      })
      .with({ Enum: P.select() }, (variants) => {
        return {
          t: 'enum',
          variants: variants.map(({ tag, type, discriminant }) => ({
            name: tag,
            discriminant,
            ref: type && transformRef(type),
          })),
        }
      })
      .with({ Option: P.select() }, (some) => {
        return {
          t: 'option',
          some: transformRef(some),
        }
      })
      .with({ Vec: P.select() }, (item) => {
        return { t: 'vec', item: transformRef(item) }
      })
      .with({ Tuple: P.select() }, (items) => {
        return {
          t: 'tuple',
          items: items.map(transformRef),
        }
      })
      .with(null, () => {
        return { t: 'alias', ref: 'Unit' }
      })
      .with(P.string, (alias) => {
        return { t: 'alias', ref: transformRef(alias) }
      })
      .exhaustive()
  )
}

export interface FixedPointParams {
  base: string
  decimalPlaces: number
  ref: string
}

export interface TransformReturn {
  definition: NamespaceDefinition
  fixedPoints: FixedPointParams[]
  nonZero: NonZeroParams[]
}

export interface NonZeroParams {
  /**
   * Like `NonZeroU32`
   */
  ty: string
}

export function transformSchema(schema: Schema): TransformReturn {
  const {
    definition: almostReady,
    fixedPoints,
    nonZero,
  } = Map(schema)
    .filter(filterRawEntry)
    .reduce<TransformReturn>(
      (acc, value, key) => {
        const maybeNonZero = tryParseNonZero(key)
        if (maybeNonZero) {
          acc.nonZero.push(maybeNonZero)
        } else {
          const ref = transformRef(key)

          match(value)
            .with({ FixedPoint: P.select() }, ({ base, decimal_places: decimalPlaces }) => {
              acc.fixedPoints.push({ base, ref, decimalPlaces })
            })
            .otherwise((value) => {
              const def = transformRustDef(value)
              debugEntry('transform %o to %o', value, def)
              acc.definition[ref] = def
            })
        }

        return acc
      },
      { definition: {}, fixedPoints: [], nonZero: [] },
    )

  return {
    definition: simplifyUnits(almostReady, { unitType: 'Unit' }),
    fixedPoints,
    nonZero,
  }
}
