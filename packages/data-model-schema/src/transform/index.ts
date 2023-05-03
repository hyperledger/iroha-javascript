/* eslint-disable max-nested-callbacks */
import type { NamespaceDefinition, TypeDef } from '@scale-codec/definition-compiler'
import Debug from '../debug'
import { Map } from 'immutable'
import { P, match } from 'ts-pattern'
import { filter as filterRef, transform as transformRef } from './ref'
import { simplifyUnits } from './simplify-units'
import type { RustDefinitions, RustFixedPointDef, RustIntDef, RustTypeDefinitionVariant } from './types'

const debugRoot = Debug.extend('transform')
const debugFilter = debugRoot.extend('filter')
const debugEntry = debugRoot.extend('entry')

function filterRawEntry(
  value: RustTypeDefinitionVariant,
  key: string,
): value is Exclude<RustTypeDefinitionVariant, RustIntDef> {
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

function transformRustDef(def: Exclude<RustTypeDefinitionVariant, RustFixedPointDef | RustIntDef>): TypeDef {
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
      // FIXME: https://github.com/hyperledger/iroha/issues/3444
      //        `VersionedSignedQuery` and `VersionedSignedTransaction` has discriminant starting with 1,
      //        which is not declared in the schema
      .with({ Enum: [{ name: 'V1', type: P.select(P.string) }] }, (type) => {
        return {
          t: 'enum',
          variants: [{ name: 'V1', ref: transformRef(type), discriminant: 1 }],
        }
      })
      .with({ Enum: P.select() }, (variants) => {
        return {
          t: 'enum',
          variants: variants.map(({ name, type }, i) => ({
            name,
            discriminant: i,
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
}

export function transformSchema(schema: RustDefinitions): TransformReturn {
  const { definition: almostReady, fixedPoints } = Map(schema)
    .filter(filterRawEntry)
    .reduce<TransformReturn>(
      (acc, value, key) => {
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

        return acc
      },
      { definition: {}, fixedPoints: [] },
    )

  return {
    definition: simplifyUnits(almostReady, { unitType: 'Unit' }),
    fixedPoints,
  }
}
